import { QueryResult } from "pg";
import { z } from "zod";
import {
  createUserSchema,
  returnUserSchema,
  returnWithoutPassword,
} from "../schemas/users.schemas";

export type iUserRequest = z.infer<typeof createUserSchema>;
export type iUserWithId = z.infer<typeof returnUserSchema>;

export type iUserResponse = z.infer<typeof returnWithoutPassword>;
export type userResult = QueryResult<iUserResponse>;
