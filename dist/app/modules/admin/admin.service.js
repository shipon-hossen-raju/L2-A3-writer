"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const blog_model_1 = __importDefault(require("../blog/blog.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
// admin service to block user
const userBlockIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // update user status to blocked
    const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
    if (!updatedUser) {
        throw new Error("User not found");
    }
    return updatedUser;
});
const blogDeleteAdminIntoDB = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    // update user status to blocked
    const blogDeleted = yield blog_model_1.default.findByIdAndDelete(blogId);
    if (!blogDeleted) {
        throw new Error("blog not found");
    }
    return blogDeleted;
});
exports.adminService = {
    userBlockIntoDB,
    blogDeleteAdminIntoDB,
};
