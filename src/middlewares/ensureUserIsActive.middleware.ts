import { Request, Response, NextFunction } from "express";
import { QueryConfig } from "pg";
import { AppError } from "../errors";
import { client } from "../database";
import { userResult } from "../interfaces/users.interface";

export const ensureUserIsActive = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);
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

  const queryResult: userResult = await client.query(queryConfig);

  if (queryResult.rows[0].active === true) {
    throw new AppError("User already active", 400);
  }

  return next();
};
