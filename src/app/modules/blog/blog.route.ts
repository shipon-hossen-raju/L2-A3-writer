import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { blogController } from "./blog.controller";
import validateRequest from "../../middleware/validateRequest";
import { blogValidation } from "./blog.validation";

const route = Router();

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

export const blogRoute = route;
