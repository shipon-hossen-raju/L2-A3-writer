import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
