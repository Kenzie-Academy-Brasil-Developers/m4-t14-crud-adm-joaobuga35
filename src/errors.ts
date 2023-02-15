import { NextFunction, Request, Response } from "express";

export class appError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(), (this.message = message), (this.statusCode = statusCode);
  }
}

export const handleError = (
  error: Error,
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  if (error instanceof appError) {
    return resp.status(error.statusCode).json({
      message: error.message,
    });
  }
  console.log(error);
  return resp.status(500).json({
    message: "Internal server error.",
  });
};
