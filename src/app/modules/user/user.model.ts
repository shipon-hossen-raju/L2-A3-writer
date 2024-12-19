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
    Number(config.bcrypt_salt_round as string),
  );

  next();
});

userSchema.post("save", function (docs, next) {
  docs.password = "";
  next();
});

userSchema.statics.isUserExists = async function (
  email: string,
): Promise<TUser> {
  return await this.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const userModel = model<TUser>("User", userSchema);

export default userModel;
