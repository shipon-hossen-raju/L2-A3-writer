import { Model } from "mongoose";

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
