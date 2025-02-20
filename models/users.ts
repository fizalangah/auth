import mongoose, { models, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Fixed typo
    },
    email: {
      type: String,
      required: true, // Fixed typo
    },
    password: {
      type: String,
      required: true, // Fixed typo
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Corrected model name to "User"
const User = models.User || mongoose.model("User", UserSchema);

export default User;
