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
exports.adminController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const status_code_1 = __importDefault(require("../../utils/status.code"));
const admin_service_1 = require("./admin.service");
const blockUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const blocked = req.url.split("/").pop();
    if (blocked !== "block") {
        return (0, sendResponse_1.default)(res, {
            success: false,
            message: "Invalid URL",
            statusCode: status_code_1.default.badRequest,
        });
    }
    // block user
    const user = yield admin_service_1.adminService.userBlockIntoDB(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User blocked successfully",
        statusCode: status_code_1.default.ok,
    });
}));
const blogDeleteAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    if (!blogId) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            message: "Invalid URL",
            statusCode: status_code_1.default.badRequest,
        });
    }
    // blog delete
    const blog = yield admin_service_1.adminService.blogDeleteAdminIntoDB(blogId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Blog deleted successfully",
        statusCode: status_code_1.default.ok,
    });
}));
exports.adminController = { blockUser, blogDeleteAdmin };
