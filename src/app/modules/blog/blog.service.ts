import { TBlog, TUpdateBlog } from "./blog.interface";
import BlogModel from "./blog.model";

const createBlogIntoDB = async (payload: TBlog) => {
  const blogSaved = await BlogModel.create(payload);
  return blogSaved;
};

// update blog
const updateBlogIntoDB = async (id: string, payload: Partial<TUpdateBlog>) => {
  const updatedBlog = await BlogModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedBlog;
};

// delete blog
const deleteBlogIntoDB = async (id: string) => {
  const deletedBlog = await BlogModel.findByIdAndDelete(id);

  return deletedBlog;
};

export const blogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
};
