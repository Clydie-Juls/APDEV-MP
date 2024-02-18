import mongoose from "mongoose";
import { ReactionSchema } from "./reaction";

export const commentSchema = new mongoose.Schema({
  commenterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  commentRepliedToId: {
    type: mongoose.Schema.Types.ObjectId, // Could also just be an int
    default: null,
    // ref: 'Comment' // Not sure since comment is more of a subtype than a model
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  uploadDate: {
    type: Date,
    required: true,
  },
  reactions: ReactionSchema,
});
