"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const auth_validation_1 = require("./auth.validation");
const route = (0, express_1.Router)();
// registration api
route.post("/register", (0, validateRequest_1.default)(user_validation_1.userValidation.userCreateValidation), auth_controller_1.authController.registerUser);
// login api
route.post("/login", (0, validateRequest_1.default)(auth_validation_1.authValidation.loginUserValidation), auth_controller_1.authController.loginUser);
exports.AuthRoute = route;
