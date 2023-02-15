import { Request, Response } from "express";

export const createUserController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  return resp.status(201).json();
};
