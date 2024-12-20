import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { TBlog, TUpdateBlog } from "./blog.interface";
import { blogService } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { title, content } = req.body;
  const clientData: TBlog = {
    title,
    content,
    author: _id,
  };

  if (!req.user)
    throw new AppError(statusCode.unauthorized, "Unauthorized access");

  const savedResult = await blogService.createBlogIntoDB(clientData);
  const result = {
    _id: savedResult?._id,
    title: savedResult?.title,
    content: savedResult?.content,
    author: req.user,
  };

  sendResponse(res, {
    success: true,
    message: "blog create successful",
    statusCode: statusCode.ok,
    data: result,
  });
});

// update blog
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const clientData: TUpdateBlog = {
    title,
    content,
  };

  if (!req.user)
    throw new AppError(statusCode.unauthorized, "Unauthorized access");

  const updatedResult = await blogService.updateBlogIntoDB(id, clientData);

  const result = {
    _id: updatedResult?._id,
    title: updatedResult?.title,
    content: updatedResult?.content,
    author: req.user,
  };

  sendResponse(res, {
    success: true,
    message: "blog updated successfully",
    statusCode: statusCode.ok,
    data: result,
  });
});

// update blog
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (!req.user)
    throw new AppError(statusCode.unauthorized, "Unauthorized access");

  const updatedResult = await blogService.deleteBlogIntoDB(id);

  sendResponse(res, {
    success: true,
    message: "blog delete successfully",
    statusCode: statusCode.ok,
  });
});

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
};
