const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");

router.get("/", storyController.getAllStories);
router.get('/search', storyController.searchStories);
router.get("/:id", storyController.getStoryById);
router.get("/category/:category", storyController.getStoriesByType);
router.post("/add", storyController.createStory);
router.put("/:id", storyController.updateStory);
router.delete("/:id", storyController.deleteStory);

module.exports = router;