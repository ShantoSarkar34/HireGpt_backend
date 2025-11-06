import mongoose from "mongoose";

const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true }, // array of 4 strings
  correctAnswer: { type: Number, required: true }, // index 0-3
});

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  videoUrl: { type: String },  // URL of uploaded video
  fileName: { type: String },  // original filename or unique filename
  size: { type: Number },
  mimeType: { type: String },
  quizQuestions: [quizQuestionSchema], // embedded array
  createdAt: { type: Date, default: Date.now },
});

export const Video = mongoose.model("Video", videoSchema);
