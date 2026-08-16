'use server'

import z from "zod";
import actionClient from "../action-client";
import prisma from "../prisma";

const createProductAction = actionClient
  .inputSchema(
    z.object({
      name: z.string().min(2).max(30),
      description: z.string().min(2).max(100),
      price: z.number(),
      image: z.string().optional(),
    }),
  )
  .action(async ({ parsedInput: request }) => {
    const product = await prisma.product.create({
      data: request,
    });

    return product;
  });

export default createProductAction;