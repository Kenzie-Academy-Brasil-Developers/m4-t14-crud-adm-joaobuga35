import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";

export const verifyEmailExists = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const emailUser: string = req.body.email;
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
    values: [emailUser],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};
