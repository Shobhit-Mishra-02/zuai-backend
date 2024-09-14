import UserRepo from "../repository/user.repo";
import { UserInterface } from "../types";
import { UserError } from "../error";
import { StatusCodes } from "http-status-codes";

const userRepo = new UserRepo();

export const getUserByIdService = async (userId: string) => {
  const user = await userRepo.getUserById(userId);
  return user;
};

export const updateUserService = async (
  user: UserInterface,
  userId: string
) => {
  const currentUser = await userRepo.getUserById(userId);

  if (!currentUser) {
    throw new UserError("user not found", StatusCodes.NOT_FOUND);
  }

  const newUser = await userRepo.UpdateUser(user, userId);

  return newUser;
};
