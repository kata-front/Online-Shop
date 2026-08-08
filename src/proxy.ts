import { NextRequest, NextResponse } from "next/server";
import { createAccessToRefresh, verifyToken } from "./utils/authServices/JWT-manager";

export default async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const response = NextResponse.next();

  if (
    request.cookies.has("refreshToken") &&
    !request.cookies.has("accessToken")
  ) {
    const accessToken = await createAccessToRefresh(
      request.cookies.get("refreshToken")?.value!,
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
    });
  }

  if (
    url.pathname.startsWith("/chats") ||
    url.pathname.startsWith("/profile")
  ) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const newUrl = new URL("/auth/login", url.pathname);

    if (accessToken) {
        try {
            const payload = await verifyToken(accessToken);

            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(newUrl);
        }
    }

    return NextResponse.redirect(newUrl);
  }

  return response;
}

export const config = {
  //matcher: ['/auth/:path*', '/chats/:path*', '/profile/:path*'],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png).*)'],
};
