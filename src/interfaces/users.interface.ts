import { QueryResult } from "pg";

export interface iUserRequest {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  isActive: boolean;
}

export interface iUserWithId extends iUserRequest {
  id: number;
}

export type userResponse = Omit<iUserWithId, "password">;
export type userResult = QueryResult<userResponse>;
