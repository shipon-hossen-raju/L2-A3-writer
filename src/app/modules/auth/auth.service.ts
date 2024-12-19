import config from "../../config";
import AppError from "../../errors/AppError";
import statusCode from "../../utils/status.code";
import { TUser } from "../user/user.interface";
import userModel from "../user/user.model";
import { createToken } from "./auth.utils";

const loginUser = async (payload: TUser) => {
  const user = await userModel.isUserExists(payload.email);

  // user checking
  if (!user) throw new AppError(statusCode.notFound, "User Not Found");

  // user blocked checking
  if (user.isBlocked)
    throw new AppError(statusCode.forbidden, "User is blocked");

  // user deleted checking
  if (user.isDeleted) throw new AppError(statusCode.notFound, "User deleted");

  // password matching
  const isPasswordMatched = await userModel.isPasswordMatched(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched)
    throw new AppError(statusCode.unauthorized, "Password does not match");

  if (!user?._id)
    throw new AppError(statusCode.unauthorized, "User ID is missing");

  const jwtPayload = {
    _id: user._id,
    role: user.role,
  };

  // access token generate
  const accessToken = await createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire as string,
  );

  // access token generate
  const refreshToken = await createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire as string,
  );

  return { accessToken, refreshToken };
};

export const authService = { loginUser };
