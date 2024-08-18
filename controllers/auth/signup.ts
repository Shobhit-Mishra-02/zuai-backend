import User from "../../schema/user.schema";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

const signup = async (req: Request, res: Response) => {
  let { email, password, firstName, lastName } = req.body;

  password = bcrypt.hashSync(password, 10);

  try {
    const user = await User.create({ email, password, firstName, lastName });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created", user });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export default signup;
