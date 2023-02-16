import { Request, Response } from "express";
import { iUserRequest, iUserResponse } from "../interfaces/users.interface";
import { userCreateService } from "../services/createUserService";

export const createUserController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const userBody: iUserRequest = req.body;

  const newUser: iUserResponse = await userCreateService(userBody);

  return resp.status(201).json(newUser);
};
