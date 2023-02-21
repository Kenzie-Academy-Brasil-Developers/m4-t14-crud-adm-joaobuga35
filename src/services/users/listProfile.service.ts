import { iUserResponseWithoutPassword } from "../../interfaces/users.interface";
import { client } from "../../database";
import { QueryConfig } from "pg";
import { returnWithoutPassword } from "../../schemas/users.schemas";

export const listProfileService = async (
  id: number
): Promise<iUserResponseWithoutPassword> => {
  const queryTemplate: string = `
        SELECT 
          *
        FROM
            users
        WHERE
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [id],
  };
  const queryResult = await client.query(queryConfig);
  return returnWithoutPassword.parse(queryResult.rows[0]);
};
