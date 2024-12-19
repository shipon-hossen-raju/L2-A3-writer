import jwt from "jsonwebtoken";
import { TJwtPayload } from "./auth.interface";

export const createToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret as string, {
    expiresIn,
  });
};
