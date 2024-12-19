import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "../user/user.validation";

const route = Router();

// registration api
route.post(
  "/register",
  validateRequest(userValidation.userCreateValidation),
  authController.registerUser,
);

// login api
route.post("login");

export const AuthRoute = route;
