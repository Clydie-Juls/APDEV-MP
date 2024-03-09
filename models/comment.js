import mongoose from "mongoose";
import { ReactionSchema } from "./shared/reaction.js";

export const CommentSchema = new mongoose.Schema({
  commenterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    required: true,
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
    default: () => Date.now(),
    required: true,
  },
  reactions: ReactionSchema,
});

export const Comment = mongoose.model("Comment", CommentSchema);
