const express = require("express");
const path = require('path');
const storyRoutes = require("./routes/storyRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/stories", storyRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use('/api/users', userRoutes);

// Global Error Handler
const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware);

module.exports = app
