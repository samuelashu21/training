import mongoose, { Schema, models, model } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser {
  email: string;
  passwordHash: string;
  role: UserRole; 
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>("User", UserSchema);