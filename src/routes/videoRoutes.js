import express from "express";
import { upload, uploadVideo, getAllVideos } from "../controllers/videoController.js";

const router = express.Router();

router.post("/upload", upload.single("video"), uploadVideo);
router.get("/", getAllVideos);

export default router;
