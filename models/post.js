import mongoose from "mongoose";
import { ValidateInt } from "./validators/intValidator.js";
import { ReactionSchema } from "./shared/reaction.js";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 1,
    required: true,
    trim: true,
  },
  posterId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    min: 1,
    required: true,
    trim: true,
  },
  uploadDate: {
    type: Date,
    default: () => Date.now(),
  },
  views: {
    type: Number,
    default: 0,
    validate: ValidateInt,
  },
  reactions: ReactionSchema,
  tags: [String],
});

export const Post = mongoose.model("Post", PostSchema);
