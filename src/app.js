import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import videoRoutes from "./routes/videoRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// To serve local video files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/videos", videoRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Super Admin Backend is running ✅");
});

export default app;
