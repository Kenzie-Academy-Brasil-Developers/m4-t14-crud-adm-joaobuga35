import { Router } from "express";
import { createUserController } from "../controllers/users.controller";
import { verifyEmailExists } from "../middlewares/users.middlewares";

export const userRoutes: Router = Router();

userRoutes.post("", verifyEmailExists, createUserController);
