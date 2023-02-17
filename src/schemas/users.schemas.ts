import { z } from "zod";
import { hashSync } from "bcryptjs";

export const createUserSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean().optional().default(false),
});

export const returnUserSchema = createUserSchema.extend({
  id: z.number(),
  isActive: z.boolean(),
});

export const returnWithoutPassword = returnUserSchema.omit({
  password: true,
});
