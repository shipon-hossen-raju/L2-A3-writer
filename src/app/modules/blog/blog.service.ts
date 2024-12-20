import { TBlog } from "./blog.interface";
import BlogModel from "./blog.model";

const createBlogIntoDB = async (payload: TBlog) => {
  const blogSaved = await BlogModel.create(payload);
  return blogSaved;
};

// update blog
const updateBlogIntoDb = async (payload: Partial<TBlog>) => {};

export const blogService = {
  createBlogIntoDB,
  updateBlogIntoDb,
};
