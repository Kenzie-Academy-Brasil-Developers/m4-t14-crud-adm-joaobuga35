import { QueryConfig } from "pg";
import format from "pg-format";
import {
  iEditProfileUser,
  iUserResponseWithoutPassword,
  userResult,
} from "../../interfaces/users.interface";
import { editSchema, returnWithoutPassword } from "../../schemas/users.schemas";
import { client } from "../../database";

export const editUserService = async (
  payload: iEditProfileUser,
  id: number
): Promise<iUserResponseWithoutPassword> => {
  const validatedData = editSchema.parse(payload);
  const queryTemplate: string = format(
    `
            UPDATE
                users
            SET (%I) = ROW (%L)
            WHERE
                id = $1
            RETURNING *;
            `,
    Object.keys(validatedData),
    Object.values(validatedData)
  );

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [id],
  };

  const queryResult: userResult = await client.query(queryConfig);

  return returnWithoutPassword.parse(queryResult.rows[0]);
};
