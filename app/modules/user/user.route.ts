import { Router } from "express";
import { userController } from "./user.controller";

const route = Router();

route.post("/create-user", userController.createUser);

export const UserRoute = route;
