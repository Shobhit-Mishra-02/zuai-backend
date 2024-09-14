import AuthenticationRepo from "../repository/auth.repo";
import { UserInterface } from "../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthError } from "../error";
import { StatusCodes } from "http-status-codes";

const authRepo = new AuthenticationRepo();

export async function signupService(
  user: Omit<UserInterface, "createdAt" | "updatedAt">
) {
  if (!user.password) {
    throw new AuthError("Password is required", StatusCodes.BAD_REQUEST);
  }

  user.password = bcrypt.hashSync(user.password, 10);

  const newUser = await authRepo.registerNewUser(user);

  return newUser;
}

export async function loginService(email: string, password: string) {
  if (!email || !password) {
    throw new AuthError("Both email and password are required.");
  }

  const user = await authRepo.validateUser(email);

  if (!user) {
    throw new AuthError("User not found");
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    throw new AuthError(
      "email or password is not correct",
      StatusCodes.UNAUTHORIZED
    );
  }

  const token = jwt.sign(
    {
      _id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "1h",
    }
  );

  return { token, user };
}
