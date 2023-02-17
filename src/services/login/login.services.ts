import { QueryConfig } from "pg";
import { iLoginRequest } from "../../interfaces/login.interface";
import {
  userResult,
  userResultWithPassword,
} from "../../interfaces/users.interface";
import { client } from "../../database";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginService = async (
  loginData: iLoginRequest
): Promise<string> => {
  const queryTemplate: string = `
        SELECT 
            *
        FROM
            users
        WHERE
            email = $1;    
    `;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [loginData.email],
  };

  const queryResult: userResultWithPassword = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email or password", 401);
  }

  const passwordVerify: boolean = await compare(
    loginData.password,
    queryResult.rows[0].password
  );

  if (!passwordVerify) {
    throw new AppError("Wrong email or password", 401);
  }

  const token: string = jwt.sign(
    { admin: queryResult.rows[0].admin },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(queryResult.rows[0].id),
    }
  );

  return token;
};
