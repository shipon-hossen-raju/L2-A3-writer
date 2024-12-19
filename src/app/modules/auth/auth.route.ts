import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "../user/user.validation";

const route = Router();

route.post(
  "/register",
  validateRequest(userValidation.userCreateValidation),
  authController.registerUser,
);

export const AuthRoute = route;
