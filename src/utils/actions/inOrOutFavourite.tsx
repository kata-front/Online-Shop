'use server';

import actionClient from "@/utils/action-client";
import getCurrentUser from "@/utils/actions/getCurrentUser";
import prisma from "@/utils/prisma";
import z from "zod";

const inOrOutFavouriteAction = actionClient
    .inputSchema(z.object({
        id: z.number(),
    }))
    .action(async ({ parsedInput }) => {
        const user = await getCurrentUser();

        if (!user) {
            throw new Error("User not found");
        }

        const userId = user.id;
        let favourites = user.favoritesId;

        if (favourites.includes(parsedInput.id)) {
            favourites = favourites.filter((id) => id !== parsedInput.id);
        } else {
            favourites.push(parsedInput.id);
        }

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                favoritesId: favourites
            }
        })

        return favourites
    })

export default inOrOutFavouriteAction