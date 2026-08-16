'use server'

import z from "zod";
import actionClient from "../action-client";
import prisma from "../prisma";

const deleteProductAction = actionClient
    .inputSchema(
        z.object({
            id: z.number(),
        }),
    )
    .action(async ({ parsedInput: request }) => {
        const exiting = await prisma.product.findUnique({
            where: {
                id: request.id,
            },
        });
        
        if (!exiting) {
            throw new Error("Product not found");
        }

        const product = await prisma.product.delete({
            where: {
                id: request.id,
            },
        });

        return product;
    });

export default deleteProductAction;