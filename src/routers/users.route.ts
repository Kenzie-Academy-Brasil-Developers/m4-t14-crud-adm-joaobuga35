import { Router } from "express";
import { createUserController } from "../controllers/users.controller";

export const userRoutes: Router = Router();

userRoutes.post("", createUserController);
