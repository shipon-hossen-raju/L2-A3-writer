"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const admin_controller_1 = require("./admin.controller");
const route = (0, express_1.Router)();
// block user api
route.patch("/users/:userId/block", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.adminController.blockUser);
// blog delete api
route.delete("/blogs/:blogId", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.adminController.blogDeleteAdmin);
exports.AdminRoute = route;
