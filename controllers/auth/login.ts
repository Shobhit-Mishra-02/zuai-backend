import { Request, Response } from "express";
import User from "../../schema/user.schema";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "User not found" });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid password" });
  }

  const token = jwt.sign(user, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h",
  });

  return res
    .status(StatusCodes.OK)
    .json({ message: "Login successful", token });
};

export default login;
