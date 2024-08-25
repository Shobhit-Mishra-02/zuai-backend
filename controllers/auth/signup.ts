import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { signupService } from "../../services/auth.services";
import { UserInterface } from "../../types";

const signup = async (req: Request, res: Response) => {
  const userDetails = req.body as Omit<
    UserInterface,
    "createdAt" | "updatedAt"
  >;

  try {
    const user = await signupService(userDetails);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created", user });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};

export default signup;
