import { NextRequest, NextResponse } from "next/server";
import {
  createAccessToken,
  verifyToken,
} from "./utils/authServices/JWT-manager";
import prisma from "./utils/prisma";
import getCurrentUser from "./utils/actions/getCurrentUser";

export default async function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  if (accessToken) {
    try {
      const user = await getCurrentUser()

      if (user) {
        return response
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
        })

        return response
      }
    } catch (error) {
      
    }
  }

  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');

  const loginUrl = new URL('/auth/login', request.url)

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/cart/:path*', '/profile/:path*'],
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png).*)"],
};
