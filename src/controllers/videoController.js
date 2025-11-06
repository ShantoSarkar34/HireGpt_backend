import Video from "../models/video.js";

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json({ videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching videos", error: error.message });
  }
};

export const uploadVideo = async (req, res) => {
  try {
    console.log(" req.body:", req.body);
    console.log(" req.file:", req.file);

    let quizQuestions = [];
    if (req.body.quizQuestions) {
      try {
        quizQuestions = JSON.parse(req.body.quizQuestions);
      } catch {
        return res.status(400).json({ message: "Invalid quizQuestions JSON" });
      }
    }

    const newVideo = await Video.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date ? new Date(req.body.date) : undefined,
      videoUrl: req.file ? `/uploads/${req.file.filename}` : null,
      fileName: req.file ? req.file.filename : null,
      size: req.file ? req.file.size : null,
      mimeType: req.file ? req.file.mimetype : null,
      quizQuestions
    });

    res.status(201).json({ success: true, video: newVideo });
  } catch (error) {
    console.error("❌ Video upload failed:", error);
    res.status(500).json({ message: "Video upload failed", error: error.message });
  }
};
