import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { blogController } from "./blog.controller";
import validateRequest from "../../middleware/validateRequest";
import { blogValidation } from "./blog.validation";

const route = Router();

// blog create route
route.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(blogValidation.createBlogValidation),
  blogController.createBlog,
);

// update route
route.patch(
  "/:id",
  auth(USER_ROLE.user),
  validateRequest(blogValidation.updateBlogValidation),
  blogController.updateBlog,
);

// delete route
route.delete(
  "/:id",
  auth(USER_ROLE.user),
  validateRequest(blogValidation.updateBlogValidation),
  blogController.deleteBlog,
);

// get all blogs
route.get("/", blogController.getAllBlogs);

export const blogRoute = route;
