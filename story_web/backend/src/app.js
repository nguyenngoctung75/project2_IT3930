const express = require("express");
const storyRoutes = require("./routes/storyRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Routes
app.use("/api/stories", storyRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/auth", authRoutes);

module.exports = app