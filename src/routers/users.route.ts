import { Router } from "express";
import {
  createUserController,
  deleteUser,
  editUser,
  listAllUsers,
  listProfileUser,
  reactiveUser,
} from "../controllers/users.controller";
import { verifyEmailExists } from "../middlewares/ensureEmailExists.middlewares";
import { ensureValidatedBody } from "../middlewares/ensureBodyIsValid.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIDisValid } from "../middlewares/ensureIdIsValidated";
import { createUserSchema, editSchema } from "../schemas/users.schemas";
import { ensureADMisValid } from "../middlewares/ensureADMIsValid.middleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureValidatedBody(createUserSchema),
  verifyEmailExists,
  createUserController
);
userRoutes.get("", ensureTokenIsValid, ensureADMisValid, listAllUsers);

userRoutes.get("/profile", ensureTokenIsValid, listProfileUser);

userRoutes.patch(
  "/:id",
  ensureTokenIsValid,
  ensureIDisValid,
  ensureValidatedBody(editSchema),
  verifyEmailExists,
  editUser
);
userRoutes.delete("/:id", ensureTokenIsValid, ensureIDisValid, deleteUser);

userRoutes.put(
  "/:id/recover",
  ensureTokenIsValid,
  ensureIDisValid,
  ensureADMisValid,
  reactiveUser
);
