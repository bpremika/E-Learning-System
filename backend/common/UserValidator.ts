import { z } from "zod";

export const userSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    first_name: z.string(),
    last_name: z.string(),
    phone_number: z.string().length(10),
    image_url: z.string(),
});

export const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
});
