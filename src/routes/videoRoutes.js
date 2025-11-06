import express from "express";
import multer from "multer";
import { uploadVideo, getAllVideos } from "../controllers/videoController.js";

const router = express.Router();

// configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// optional video: metadata-only uploads now work
router.post("/upload", upload.single("video"), uploadVideo);
router.get("/", getAllVideos);

export default router;
