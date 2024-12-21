import BlogModel from "../blog/blog.model";
import userModel from "../user/user.model";

// admin service to block user
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

const blogDeleteAdminIntoDB = async (blogId: string) => {
  // update user status to blocked
  const blogDeleted = await BlogModel.findByIdAndDelete(blogId);
  console.log("blogId ", blogId);
  console.log("updatedUser ", blogDeleted);

  if (!blogDeleted) {
    throw new Error("blog not found");
  }

  return blogDeleted;
};

export const adminService = {
  userBlockIntoDB,
  blogDeleteAdminIntoDB,
};
