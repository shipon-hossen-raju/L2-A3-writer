import { Router } from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middleware/validateRequest";

const route = Router();

// block user api
route.patch(
  "/users/:userId/block",
  //   validateRequest(),
  adminController.blockUser,
);

export const AdminRoute = route;
