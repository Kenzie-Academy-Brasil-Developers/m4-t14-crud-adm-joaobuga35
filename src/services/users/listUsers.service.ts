import {
  IListUsersWithoutPassword,
  listAllUsersResult,
} from "../../interfaces/users.interface";
import { client } from "../../database";
import { listAllUsersWithoutPassword } from "../../schemas/users.schemas";

export const listAllUsersService =
  async (): Promise<IListUsersWithoutPassword> => {
    const queryString: string = `
        SELECT 
          *
        FROM
            users;
    `;

    const queryResult = await client.query(queryString);
    return listAllUsersWithoutPassword.parse(queryResult.rows);
  };
