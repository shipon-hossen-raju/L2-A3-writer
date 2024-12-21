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
exports.blogService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blog_const_1 = require("./blog.const");
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blogSaved = yield blog_model_1.default.create(payload);
    return blogSaved;
});
// update single blog
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getBlog = yield blog_model_1.default.findById(id);
    return getBlog;
});
// update blog
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBlog = yield blog_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedBlog;
});
// delete blog
const deleteBlogIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBlog = yield blog_model_1.default.findByIdAndDelete(id);
    return deletedBlog;
});
// get all blogs from db by search, sortby, filter
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(blog_model_1.default.find().populate("author", { name: 1, email: 1 }), query)
        .search(blog_const_1.searchableFields)
        .filter()
        .sort();
    const blogs = yield courseQuery.modelQuery;
    return blogs;
});
exports.blogService = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogIntoDB,
    getBlogById,
    getAllBlogsFromDB,
};
