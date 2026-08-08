'use server'

import z from "zod";
import actionClient from "../action-client";
import { cookies } from "next/headers";
import { hashPassword } from "../authServices/password-manager";
import prisma from "../prisma";
import { createAndSetTokens } from "../authServices/JWT-manager";

const createUser = actionClient
    .inputSchema(z.object({
        email: z.string().max(255).email(),
        name: z.string().max(30).min(2),
        password: z.string().min(6).max(30),
    }))
    .action(async ({ parsedInput: request }) => {
        const cookieStore = await cookies();

        if (cookieStore.has('accessToken') || cookieStore.has('refreshToken')) {
            throw new Error('User already logged in');
        }

        const hashedPassword = await hashPassword(request.password);

        const {id, name, email} = await prisma.user.create({
            data: {
                ...request,
                password: hashedPassword
            },
        })

        return await createAndSetTokens({id, name, email}, cookieStore);
    });

export default createUser