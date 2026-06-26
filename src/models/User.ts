import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role: "user" | "admin";
  emailVerified: boolean;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name:                    { type: String, required: true, trim: true },
    email:                   { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash:            { type: String, required: true },
    phone:                   { type: String, trim: true },
    role:                    { type: String, enum: ["user", "admin"], default: "user" },
    emailVerified:           { type: Boolean, default: false },
    verificationToken:       { type: String },
    verificationTokenExpiry: { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;
