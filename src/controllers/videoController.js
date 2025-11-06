import multer from "multer";
import path from "path";
import crypto from "crypto";
import { Video } from "../models/videoModel.js";

// store files locally (uploads folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueId = crypto.randomBytes(6).toString("hex");
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueId}${ext}`);
  },
});

export const uploadVideo = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log(" req.file:", req.file);

    // Parse quizQuestions if sent
    let quizQuestions = [];
    if (req.body.quizQuestions) {
      try {
        quizQuestions = JSON.parse(req.body.quizQuestions);
        console.log(" Parsed quizQuestions:", quizQuestions);
      } catch (err) {
        console.log(" Invalid quizQuestions JSON");
        return res.status(400).json({ message: "Invalid quizQuestions JSON" });
      }
    }

    const newVideo = await Video.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date ? new Date(req.body.date) : undefined,
      videoUrl: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null,
      fileName: req.file ? req.file.filename : null,
      size: req.file ? req.file.size : null,
      mimeType: req.file ? req.file.mimetype : null,
      quizQuestions,
    });

    console.log("✅ Video saved:", newVideo);
    res.status(201).json({ success: true, video: newVideo });
  } catch (error) {
    console.error("❌ Video upload failed:", error);
    res.status(500).json({ message: "Video upload failed", error: error.message });
  }
};




// GET /api/videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos", error: error.message });
  }
};
