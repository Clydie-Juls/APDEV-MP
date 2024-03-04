import mongoose from "mongoose";
import fetch from "node-fetch";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 1,
  },
  // Temporary property
  password: {
    type: String,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    default: "Never gonna give you up.",
  },
  // Will implement default image later
  picture: {
    type: Buffer,
    default: async function () {
      const res = await fetch("https://github.com/shadcn.png");
      const buffer = await res.arrayBuffer();
      return buffer;
    },
  },
});

export const User = mongoose.model("User", UserSchema);
