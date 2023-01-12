import { z } from "zod";

const isPrefix = (s: string) => s === "MR" || s === "MRS" || s === "MS";

export const userSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    first_name: z.string(),
    last_name: z.string(),
    prefix: z.string().refine(isPrefix),
    phone_number: z.string().length(10).optional(),
    image_url: z.string().optional(),
});

export const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
});
