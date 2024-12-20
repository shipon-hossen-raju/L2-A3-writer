import userModel from "../user/user.model";

const userBlockIntoDB = async (userId: string) => {
  // update user status to blocked
  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

export const adminService = {
  userBlockIntoDB,
};
