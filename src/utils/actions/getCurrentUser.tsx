"use server";

import { cookies } from "next/headers";
import { verifyToken } from "../authServices/JWT-manager";
import prisma from "../prisma";

const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const { id, email } = (await verifyToken(accessToken)) as {
      id: number;
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id, email,
      },
      include: {
        products: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;