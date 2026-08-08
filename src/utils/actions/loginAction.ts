"use server";

import z from "zod";
import actionClient from "../action-client";
import { cookies } from "next/headers";
import prisma from "../prisma";
import { comparePassword } from "../authServices/password-manager";
import { createAndSetTokens } from "../authServices/JWT-manager";

const loginAction = actionClient
  .inputSchema(
    z.object({
      email: z.string().max(255).email(),
      password: z.string().min(6).max(30),
    }),
  )
  .action(async ({ parsedInput }) => {
    const cookieStore = await cookies();
    const { email, password } = parsedInput;

    if (cookieStore.has("accessToken") || cookieStore.has("refreshToken")) {
      throw new Error("User already logged in");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isVerifed = await comparePassword(password, user.password);

    if (!isVerifed) {
      throw new Error("Invalid password");
    }

    return await createAndSetTokens(user, cookieStore);
  });

export default loginAction;
