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

export const editSchema = z.object({
  name: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  admin: z.boolean().optional().default(false),
  active: z.boolean().optional(),
});

export const returnUserSchema = createUserSchema.extend({
  id: z.number(),
  active: z.boolean(),
});

export const returnWithoutPassword = returnUserSchema.omit({
  password: true,
});

export const listAllUsersWithoutPassword = z.array(returnWithoutPassword);
