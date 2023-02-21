import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";

export const deleteUserService = async (
  userIdParam: number,
  typeUser: boolean,
  idProfile: number
): Promise<void> => {
  if (userIdParam !== idProfile && typeUser === false) {
    throw new AppError("Insufficient Permission", 403);
  }

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
    values: [userIdParam],
  };

  await client.query(queryConfig);
};
