import { TBlog } from "./blog.interface";
import BlogModel from "./blog.model";

const createBlogIntoDB = async (payload: TBlog) => {
  console.log("service payload ", payload);
  const blogSaved = await BlogModel.create(payload);
  return blogSaved;
};

export const blogService = {
  createBlogIntoDB,
};
