import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { adminController } from "./admin.controller";

const route = Router();

// block user api
route.patch(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  adminController.blockUser,
);

// blog delete api
route.delete(
  "/blogs/:blogId",
  auth(USER_ROLE.admin),
  adminController.blogDeleteAdmin,
);

export const AdminRoute = route;
