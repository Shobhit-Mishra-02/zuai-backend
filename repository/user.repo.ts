import User from "../schema/user.schema";
import { UserInterface } from "../types";

class UserRepo {
  construct() {}

  async getUserById(id: string) {
    const user = await User.findById(id);
    return user;
  }

  async UpdateUser(user: UserInterface, id: string) {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...user,
      },
      { new: true }
    );

    return updatedUser;
  }
}

export default UserRepo;
