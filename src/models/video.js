import mongoose from "mongoose";

const quizQuestionSchema = new mongoose.Schema({
  id: String,
  question: String,
  options: [String],
  correctAnswer: Number
});

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  videoUrl: String,
  fileName: String,
  size: Number,
  mimeType: String,
  quizQuestions: [quizQuestionSchema]
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);
