import format from "pg-format";
import {
  iUserRequest,
  iUserResponse,
  userResult,
} from "../interfaces/users.interface";
import { client } from "../database";
import { returnWithoutPassword } from "../schemas/users.schemas";

export const userCreateService = async (
  payload: iUserRequest
): Promise<iUserResponse> => {
  const queryTemplate: string = format(
    `
        INSERT INTO 
            users (%I)
        VALUES (%L)
        RETURNING*;
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: userResult = await client.query(queryTemplate);

  const newUser = returnWithoutPassword.parse(queryResult.rows[0]);
  return newUser;
};
