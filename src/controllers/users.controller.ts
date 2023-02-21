import { Request, Response } from "express";
import {
  IListUsersWithoutPassword,
  iUserRequest,
  iUserResponseWithoutPassword,
} from "../interfaces/users.interface";
import { userCreateService } from "../services/users/createUser.service";
import { listAllUsersService } from "../services/users/listUsers.service";
import { listProfileService } from "../services/users/listProfile.service";
import { editUserService } from "../services/users/editUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { reactiveUserService } from "../services/users/reactiveUser.service";

export const createUserController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const userBody: iUserRequest = req.body;

  const newUser: iUserResponseWithoutPassword = await userCreateService(
    userBody
  );

  return resp.status(201).json(newUser);
};

export const listAllUsers = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const users: IListUsersWithoutPassword = await listAllUsersService();

  return resp.status(200).json(users);
};

export const listProfileUser = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const id: number = req.user.id;

  const profile = await listProfileService(id);

  return resp.status(200).json(profile);
};

export const editUser = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  const edit = await editUserService(req.body, id, req.user.role, req.user.id);

  return resp.status(200).json(edit);
};

export const deleteUser = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  await deleteUserService(id, req.user.role, req.user.id);

  return resp.status(204).json();
};

export const reactiveUser = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  const responseUser = await reactiveUserService(id);

  return resp.status(200).json(responseUser);
};
