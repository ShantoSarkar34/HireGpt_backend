import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import videoRoutes from "./src/routes/videoRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

// Routes
app.use("/api/videos", videoRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Super Admin Backend is running !");
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
