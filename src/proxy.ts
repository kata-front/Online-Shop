import { NextRequest, NextResponse } from "next/server";
import {
  createAccessToken,
  verifyToken,
} from "./utils/authServices/JWT-manager";
import prisma from "./utils/prisma";
import getCurrentUser from "./utils/actions/getCurrentUser";

export default async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const response = NextResponse.next();

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  if (accessToken) {
    try {
      const user = await getCurrentUser();

      if (user) {
        if (url.pathname.startsWith("/admin") && user?.role !== "ADMIN") {
          console.log("User role: ", user.role);
          return NextResponse.redirect(new URL("/", request.url));
        }

        return response;
      }
    } catch (error) {
      response.cookies.delete("accessToken");
    }
  }

  if (refreshToken) {
    try {
      const { id, email } = (await verifyToken(refreshToken.value)) as {
        id: number;
        email: string;
      };

      const user = await prisma.user.findUnique({ where: { id, email } });

      if (user) {
        const accessToken = await createAccessToken(user);
        response.cookies.set("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 15,
        });

        if (url.pathname.startsWith("/admin") && user?.role !== "ADMIN") {
          console.log("User role: ", user.role);
          return NextResponse.redirect(new URL("/", request.url));
        }

        return response;
      }
    } catch (error) {}
  }

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");

  const loginUrl = new URL("/auth/login", request.url);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/cart/:path*", "/profile/:path*", "/admin/:path*"],
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png).*)"],
};
