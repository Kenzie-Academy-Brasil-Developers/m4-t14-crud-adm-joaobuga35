import { Request, Response } from "express";
import { loginService } from "../services/login/login.services";

export const loginController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const token = await loginService(req.body);

  return resp.json({
    token: token,
  });
};
