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

export const upload = multer({ storage });

// POST /api/videos/upload
export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No video file uploaded" });

    const newVideo = await Video.create({
      title: req.body.title || "Untitled Video",
      fileName: req.file.filename,
      videoUrl: `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`,
      size: req.file.size,
      mimeType: req.file.mimetype,
    });

    res.status(201).json({ success: true, video: newVideo });
  } catch (error) {
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
