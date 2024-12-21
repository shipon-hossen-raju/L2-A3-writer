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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const status_code_1 = __importDefault(require("../utils/status.code"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1].trim();
        if (!token)
            throw new AppError_1.default(status_code_1.default.unauthorized, "Unauthorized access");
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        if (!decoded)
            throw new AppError_1.default(status_code_1.default.unauthorized, "Unauthorized access");
        const { _id, role, iat, exp } = decoded;
        const user = yield user_model_1.default.findById(_id);
        if (!user)
            throw new AppError_1.default(status_code_1.default.unauthorized, "Unauthorized access");
        if (user.isBlocked)
            throw new AppError_1.default(status_code_1.default.forbidden, "User is blocked");
        if (requiredRoles && !requiredRoles.includes(role))
            throw new AppError_1.default(status_code_1.default.forbidden, "Forbidden access!");
        req.user = user;
        next();
    }));
};
exports.default = auth;
