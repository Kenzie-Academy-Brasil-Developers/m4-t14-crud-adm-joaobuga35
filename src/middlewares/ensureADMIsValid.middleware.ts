import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export const ensureADMisValid = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authenticatedUser = req.user;

  if (authenticatedUser.role === false) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};
