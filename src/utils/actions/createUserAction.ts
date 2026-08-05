import z from "zod";
import actionClient from "../action-client";

const createUser = actionClient
    .inputSchema(z.object({
        email: z.string().max(255).email(),
        name: z.string().max(30).min(2),
        password: z.string().min(6).max(30),
    }))
    .action(async ({ parsedInput: { email, name, password } }) => {
        
    });