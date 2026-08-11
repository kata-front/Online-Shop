"use server";

import z from "zod";
import actionClient from "../action-client";
import { cookies } from "next/headers";
import { createAccessToken, verifyToken } from "../authServices/JWT-manager";
import prisma from "../prisma";
import { redirect } from "next/navigation";
import getCurrentUser from "./getCurrentUser";

export const addToCartAction = actionClient
  .inputSchema(
    z.object({
      id: z.number(),
      name: z.string().min(2).max(30),
    }),
  )
  .action(async ({ parsedInput }) => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken");
    const refreshToken = cookieStore.get("refreshToken");

    if (accessToken) {
      try {
        const user = await getCurrentUser();

        if (!user) {
          throw new Error("User not found");
        }

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            products: {
              connect: {
                id: parsedInput.id,
              },
            },
          },
        });

        redirect("/cart");
      } catch (error: any) {
        if (error?.message === "NEXT_REDIRECT") throw error;
      }
    }

    if (refreshToken) {
      try {
        const { id, email } = (await verifyToken(refreshToken.value)) as {
          id: number;
          email: string;
        };

        const user = await prisma.user.findUnique({ where: { id, email } });

        if (!user) {
          throw new Error("User not found");
        }

        const newAccessToken = await createAccessToken(user);
        cookieStore.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 15,
        });

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            products: {
              connect: {
                id: parsedInput.id,
              },
            },
          },
        });

        redirect("/cart");
      } catch (error: any) {
        if (error?.message === "NEXT_REDIRECT") throw error;
      }
    }

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    redirect("/auth/login");
  });
