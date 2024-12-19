import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is require!"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is require!"],
      unique: [true, "email is already register!"],
    },
    password: {
      type: String,
      required: true,
      // select: 0,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    config.bcrypt_salt_round as string,
  );
});

const userModel = model<TUser>("User", userSchema);

export default userModel;
