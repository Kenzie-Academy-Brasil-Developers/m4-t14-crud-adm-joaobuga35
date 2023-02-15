import format from "pg-format";
import {
  iUserRequest,
  userResponse,
  userResult,
} from "../interfaces/users.interface";
import { client } from "../database";

export const userCreateService = async (
  payload: iUserRequest
): Promise<userResponse> => {
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

  return queryResult.rows[0];
};
