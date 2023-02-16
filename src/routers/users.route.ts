import { Router } from "express";
import { createUserController } from "../controllers/users.controller";
import { verifyEmailExists } from "../middlewares/ensureEmailExists.middlewares";
import { ensureValidatedBody } from "../middlewares/ensureBodyIsValid.middleware";
import { createUserSchema } from "../schemas/users.schemas";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureValidatedBody(createUserSchema),
  verifyEmailExists,
  createUserController
);
