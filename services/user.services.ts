import UserRepo from "../repository/user.repo";
import { UserInterface } from "../types";
import { UserError } from "../error";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

const userRepo = new UserRepo();

export const getUserByIdService = async (userId: string) => {
  const user = await userRepo.getUserById(userId);
  return user;
};

export const updateUserService = async (
  user: UserInterface,
  targetUserId: string,
  userId: string
) => {
  if (!user) {
    throw new UserError("user is required");
  }

  if (targetUserId !== userId) {
    throw new UserError("user is not authorized", StatusCodes.UNAUTHORIZED);
  }

  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }

  const newUser = await userRepo.UpdateUser(user, userId);

  return newUser;
};
