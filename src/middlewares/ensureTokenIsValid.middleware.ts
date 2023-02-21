import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";
import { number } from "zod";

export const ensureTokenIsValid = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing Bearer Token.", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message);
    }

    req.user = {
      id: parseInt(decoded.sub),
      role: decoded.admin,
    };
    return next();
  });
};
