const express = require("express");
const storyRoutes = require("./routes/storyRoutes");
const chapterRoutes = require("./routes/chapterRoutes");

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Routes
app.use("/api/stories", storyRoutes);
app.use("/api/chapters", chapterRoutes);

module.exports = app