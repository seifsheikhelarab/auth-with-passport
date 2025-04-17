import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  google: {
    displayName: { type: String },
    email: { type: String }
  },
  twitter: {
    displayName: { type: String },
    id: { type: String }, 
    username: { type: String }
  }
});

export const UserModel = mongoose.model("User", userSchema)