import format from "pg-format";
import {
  iUserRequest,
  userResponse,
  userResult,
} from "../interfaces/users.interface";
import { client } from "../database";
import { createUserSchema } from "../schemas/users.schemas";

export const userCreateService = async (
  payload: iUserRequest
): Promise<userResponse> => {
  const validatedUserData = createUserSchema.parse(payload);
  const queryTemplate: string = format(
    `
        INSERT INTO 
            users (%I)
        VALUES (%L)
        RETURNING*;
    `,
    Object.keys(validatedUserData),
    Object.values(validatedUserData)
  );

  const queryResult: userResult = await client.query(queryTemplate);

  return queryResult.rows[0];
};
