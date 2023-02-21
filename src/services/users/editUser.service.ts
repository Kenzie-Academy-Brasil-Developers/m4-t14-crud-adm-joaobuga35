import { QueryConfig } from "pg";
import format from "pg-format";
import {
  iEditProfileUser,
  iUserResponseWithoutPassword,
  userResult,
} from "../../interfaces/users.interface";
import { returnWithoutPassword } from "../../schemas/users.schemas";
import { client } from "../../database";
import { AppError } from "../../errors";
export const editUserService = async (
  payload: iEditProfileUser,
  userIdParam: number,
  typeUser: boolean,
  idProfile: number
): Promise<iUserResponseWithoutPassword> => {
  if (userIdParam !== idProfile && typeUser === false) {
    throw new AppError("Insufficient Permission", 403);
  }

  const queryTemplate: string = format(
    `
            UPDATE
                users
            SET (%I) = ROW (%L)
            WHERE
                id = $1
            RETURNING *;
            `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [userIdParam],
  };

  const queryResult: userResult = await client.query(queryConfig);

  return returnWithoutPassword.parse(queryResult.rows[0]);
};
