import { TUser } from "./user.interface";
import userModel from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const userSaved = await userModel.create(payload);
  return userSaved;
};

export const userService = {
  createUserIntoDB,
};
