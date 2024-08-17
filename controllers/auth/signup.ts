import User from "../../schema/user.schema";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const signup = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const user = await User.create({ email, password, firstName, lastName });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default signup;
