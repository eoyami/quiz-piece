import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

interface IUsers extends Document {
  username: string,
  password: string,
  email: string
}

const userModel = new Schema<IUsers>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const User = mongoose.models.Users || mongoose.model<IUsers>("Users", userModel);
