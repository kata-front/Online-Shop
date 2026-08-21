"use server";

import actionClient from "@/utils/action-client";
import prisma from "@/utils/prisma";
import z from "zod";

const updateProfileAction = actionClient
  .inputSchema(
    z.object({
      id: z.number(),
      name: z.string().min(2).max(30).optional(),
      email: z.string().max(255).email().optional()
    }),
  )
  .action(async ({ parsedInput }) => {
    await prisma.user.update({
      where: {
        id: parsedInput.id,
      },
      data: {
        ...parsedInput,
      },
    });
  });

export default updateProfileAction;
