import { QueryConfig } from "pg";
import { client } from "../../database";

export const deleteUserService = async (userId: number): Promise<void> => {
  const queryTemplate: string = `
        UPDATE 
            users
        SET
            "active" = false
        WHERE 
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [userId],
  };

  await client.query(queryConfig);
};
