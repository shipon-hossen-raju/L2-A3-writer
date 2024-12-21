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
exports.authService = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const status_code_1 = __importDefault(require("../../utils/status.code"));
const user_model_1 = __importDefault(require("../user/user.model"));
const auth_utils_1 = require("./auth.utils");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExists(payload.email);
    // user checking
    if (!user)
        throw new AppError_1.default(status_code_1.default.notFound, "User Not Found");
    // user blocked checking
    if (user.isBlocked)
        throw new AppError_1.default(status_code_1.default.forbidden, "User is blocked");
    // password matching
    const isPasswordMatched = yield user_model_1.default.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched)
        throw new AppError_1.default(status_code_1.default.unauthorized, "Password does not match");
    if (!(user === null || user === void 0 ? void 0 : user._id))
        throw new AppError_1.default(status_code_1.default.unauthorized, "User ID is missing");
    const jwtPayload = {
        _id: user._id,
        role: user.role,
    };
    // access token generate
    const accessToken = yield (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire);
    // access token generate
    const refreshToken = yield (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expire);
    return { accessToken, refreshToken };
});
exports.authService = { loginUser };
