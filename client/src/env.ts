import { z } from "zod";

const viteEnvSchema = z.object({
    VITE_CLIENT_URL: z.string(),
    VITE_API_URL: z.string(),
})

const {data,error,success} = viteEnvSchema.safeParse(import.meta.env);

if (!success) {
    throw new Error('Invalid environment variables'+error.flatten().fieldErrors);
}

export const envVariables = data!
