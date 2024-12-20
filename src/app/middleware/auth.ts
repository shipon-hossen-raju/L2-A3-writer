import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import statusCode from "../utils/status.code";
import userModel from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1].trim();

    if (!token)
      throw new AppError(statusCode.unauthorized, "Unauthorized access");

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    if (!decoded)
      throw new AppError(statusCode.unauthorized, "Unauthorized access");

    const { _id, role, iat, exp } = decoded;

    const user = await userModel.findById(_id);

    if (!user)
      throw new AppError(statusCode.unauthorized, "Unauthorized access");
    if (user.isBlocked)
      throw new AppError(statusCode.forbidden, "User is blocked");

    if (user.isDeleted)
      throw new AppError(statusCode.forbidden, "User is deleted");

    if (requiredRoles && !requiredRoles.includes(role as TUserRole))
      throw new AppError(statusCode.forbidden, "Forbidden access");

    req.user = user;

    next();
  });
};

export default auth;
