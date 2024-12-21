import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./blog.const";
import { TBlog, TUpdateBlog } from "./blog.interface";
import BlogModel from "./blog.model";

const createBlogIntoDB = async (payload: TBlog) => {
  const blogSaved = await BlogModel.create(payload);
  return blogSaved;
};

// update single blog
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
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    BlogModel.find().populate("author", { name: 1, email: 1 }),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort();

  const blogs = await courseQuery.modelQuery;

  return blogs;
};

export const blogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
  getBlogById,
  getAllBlogsFromDB,
};
