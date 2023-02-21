import { Router } from "express";
import {
  createUserController,
  deleteUser,
  editUser,
  listAllUsers,
  listProfileUser,
} from "../controllers/users.controller";
import { verifyEmailExists } from "../middlewares/ensureEmailExists.middlewares";
import { ensureValidatedBody } from "../middlewares/ensureBodyIsValid.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIDisValid } from "../middlewares/ensureIdIsValidated";
import { createUserSchema } from "../schemas/users.schemas";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureValidatedBody(createUserSchema),
  verifyEmailExists,
  createUserController
);

userRoutes.get("", ensureTokenIsValid, listAllUsers);
userRoutes.get("/profile", ensureTokenIsValid, listProfileUser);
userRoutes.patch(
  "/:id",
  ensureTokenIsValid,
  ensureIDisValid,
  verifyEmailExists,
  editUser
);
userRoutes.delete("/:id", ensureTokenIsValid, ensureIDisValid, deleteUser);
userRoutes.put("/:id/recover", ensureTokenIsValid, ensureIDisValid);
