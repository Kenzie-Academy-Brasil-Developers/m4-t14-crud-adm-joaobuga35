import { QueryResult } from "pg";
import { z } from "zod";
import {
  createUserSchema,
  editSchema,
  listAllUsersWithoutPassword,
  returnUserSchema,
  returnWithoutPassword,
} from "../schemas/users.schemas";

export type iUserRequest = z.infer<typeof createUserSchema>;
export type iUserWithId = z.infer<typeof returnUserSchema>;
export type userResultWithPassword = QueryResult<iUserWithId>;

export type iUserResponseWithoutPassword = z.infer<
  typeof returnWithoutPassword
>;
export type userResult = QueryResult<iUserResponseWithoutPassword>;

export type IListUsersWithoutPassword = z.infer<
  typeof listAllUsersWithoutPassword
>;
export type listAllUsersResult = QueryResult<IListUsersWithoutPassword>;

export type iEditProfileUser = z.infer<typeof editSchema>;
