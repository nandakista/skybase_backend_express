import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Email format is invalid"),
    password: z.any(),
});