import User from "../schema/user.schema";
import { UserInterface } from "../types";

class AuthenticationRepo {
  constructor() {}

  async registerNewUser(user: Omit<UserInterface, "createdAt" | "updatedAt">) {
    const newUser = await User.create({ ...user });
    return user;
  }

  async validateUser(email: string) {
    const user = await User.findOne({ email });
    return user;
  }
}

export default AuthenticationRepo;
