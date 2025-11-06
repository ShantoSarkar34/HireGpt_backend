import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileName: String,
  videoUrl: String,
  size: Number,
  mimeType: String,
  createdAt: { type: Date, default: Date.now },
});

export const Video = mongoose.model("Video", videoSchema);
