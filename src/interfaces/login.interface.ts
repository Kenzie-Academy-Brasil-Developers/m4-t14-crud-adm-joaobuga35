import { z } from "zod";
import { loginBodySchema } from "../schemas/login.schema";

export type iLoginRequest = z.infer<typeof loginBodySchema>;
