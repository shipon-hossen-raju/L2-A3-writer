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
exports.blogController = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const status_code_1 = __importDefault(require("../../utils/status.code"));
const blog_service_1 = require("./blog.service");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { title, content } = req.body;
    const clientData = {
        title,
        content,
        author: _id,
    };
    if (!req.user)
        throw new AppError_1.default(status_code_1.default.unauthorized, "Unauthorized access");
    const savedResult = yield blog_service_1.blogService.createBlogIntoDB(clientData);
    const result = {
        _id: savedResult === null || savedResult === void 0 ? void 0 : savedResult._id,
        title: savedResult === null || savedResult === void 0 ? void 0 : savedResult.title,
        content: savedResult === null || savedResult === void 0 ? void 0 : savedResult.content,
        author: req.user,
    };
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "blog create successful",
        statusCode: status_code_1.default.ok,
        data: result,
    });
}));
// update blog
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { id } = req.params;
    const { title, content } = req.body;
    const clientData = {
        title,
        content,
    };
    if (!req.user)
        throw new AppError_1.default(status_code_1.default.unauthorized, "Unauthorized access");
    const blog = yield blog_service_1.blogService.getBlogById(id);
    if (!blog)
        throw new AppError_1.default(status_code_1.default.notFound, "Blog not found with this id");
    // own blog check
    if (((_a = blog === null || blog === void 0 ? void 0 : blog.author) === null || _a === void 0 ? void 0 : _a.toString()) !== ((_c = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id) === null || _c === void 0 ? void 0 : _c.toString()))
        throw new AppError_1.default(status_code_1.default.unauthorized, "Unauthorized access");
    const updatedResult = yield blog_service_1.blogService.updateBlogIntoDB(id, clientData);
    const result = {
        _id: updatedResult === null || updatedResult === void 0 ? void 0 : updatedResult._id,
        title: updatedResult === null || updatedResult === void 0 ? void 0 : updatedResult.title,
        content: updatedResult === null || updatedResult === void 0 ? void 0 : updatedResult.content,
        author: req.user,
    };
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "blog updated successfully",
        statusCode: status_code_1.default.ok,
        data: result,
    });
}));
// update blog
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.user)
        throw new AppError_1.default(status_code_1.default.unauthorized, "Unauthorized access");
    const updatedResult = yield blog_service_1.blogService.deleteBlogIntoDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "blog delete successfully",
        statusCode: status_code_1.default.ok,
    });
}));
// get all blogs from db by search, sortby, filter
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogService.getAllBlogsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "all blogs",
        statusCode: status_code_1.default.ok,
        data: result,
    });
}));
exports.blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
};
