const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapterController");

router.get("/story/:storyId", chapterController.getChaptersByStoryId); // Lấy danh sách chương theo truyện
router.get("/story/:storyId/chapter/:chapternum", chapterController.getChapterByNumber); // Lấy chi tiết chương
router.post("/", chapterController.createChapter); // Tạo chương mới
router.put("/story/:storyId/chapter/:chapternum", chapterController.updateChapter); // Cập nhật chương
router.delete("/story/:storyId/chapter/:chapternum", chapterController.deleteChapter); // Xóa chương

module.exports = router;