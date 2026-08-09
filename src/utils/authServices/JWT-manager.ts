import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { User } from "../types";
import * as jose from "jose";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const createAccessToken = async (user: User): Promise<string> => {
  return await new jose.SignJWT({
    ...user,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
};

export const createRefreshToken = async (user: User): Promise<string> => {
  return await new jose.SignJWT({
    ...user,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const createAndSetTokens = async (user: User, cookieStore: ReadonlyRequestCookies) => {
  const accessToken = await createAccessToken(user);
  const refreshToken = await createRefreshToken(user);

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 15,
  });

  return {success: true};
}