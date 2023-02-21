import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { ensureValidatedBody } from "../middlewares/ensureBodyIsValid.middleware";
import { loginBodySchema } from "../schemas/login.schema";

export const loginRoutes: Router = Router();

loginRoutes.post("", ensureValidatedBody(loginBodySchema), loginController);
