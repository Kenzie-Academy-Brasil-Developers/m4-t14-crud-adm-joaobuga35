import { QueryConfig } from "pg";
import { client } from "../../database";
import {
  iUserResponseWithoutPassword,
  userResult,
} from "../../interfaces/users.interface";
import { returnWithoutPassword } from "../../schemas/users.schemas";

export const reactiveUserService = async (
  userIdParam: number
): Promise<iUserResponseWithoutPassword> => {
  const queryPutReactiveUser: string = `
    UPDATE 
        users
    SET
        active = true
    WHERE
        id = $1;
    `;

  const queryConfigPutReactiveUser: QueryConfig = {
    text: queryPutReactiveUser,
    values: [userIdParam],
  };

  await client.query(queryConfigPutReactiveUser);

  const queryTemplate = `
          SELECT
              *
          FROM
              users
          WHERE
              id = $1;
      `;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [userIdParam],
  };

  const queryResult: userResult = await client.query(queryConfig);

  return returnWithoutPassword.parse(queryResult.rows[0]);
};
