import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  email: string;
  password: string;
}

export interface IUserModel extends IUser, Document {
  isValidPassword(password: string): Promise<Error | boolean>;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUserModel>("User", UserSchema);
