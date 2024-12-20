import { TBlog, TUpdateBlog } from "./blog.interface";
import BlogModel from "./blog.model";

const createBlogIntoDB = async (payload: TBlog) => {
  const blogSaved = await BlogModel.create(payload);
  return blogSaved;
};

// update blog
const getBlogById = async (id: string) => {
  const getBlog = await BlogModel.findById(id);

  return getBlog;
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

// get all blogs from db by search, sortby, filter
const getAllBlogsFromDB = async (
  search?: string,
  sortBy?: string,
  sortOrder?: string,
  filter?: string,
) => {
  const query = {} as any;

  if (search) query.title = { $regex: search, $options: "i" };

  if (filter) query.author = filter;

  const sortOption = {} as any;
  if (sortBy) {
    sortOption[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  console.log("search query", query);

  return await BlogModel.find(query).sort(sortOption);
};

export const blogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
  getBlogById,
  getAllBlogsFromDB,
};
