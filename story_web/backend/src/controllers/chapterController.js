const { cleanContent } = require("../utils/cleanContent")
const Chapter = require("../models/Chapter")
const Story = require("../models/Story")

// Lấy danh sách chương của 1 truyện
exports.getChaptersByStoryId = async (req, res) => {
    try {
        const storyId = req.params.storyId;
        const chapters = await Chapter.findAll({
            where: { story_id: storyId },
            order: [["chapternum", "ASC"]],
        });
        
        if (!chapters.length) {
            return res.status(404).json({message: "Không tìm thấy chương nào của truyện với id = " + storyId})
        }

        // Làm sạch content trước khi gửi về client
        // const cleanedChapters = chapters.map(chap => ({
        //     ...chap.toJSON(),
        //     content: cleanContent(chap.content)  // Áp dụng hàm cleanContent
        // }));
        
        res.json(chapters)
        // res.status(200).json({ message: "Lấy danh sách chương thành công", chapters: cleanedChapters });
    } catch (error) {
        res.status(500).json({message: error.message + "Lỗi khi lấy danh sách chương theo id truyện"})
    }
}

// Lấy chi tiết 1 chương của 1 truyện
exports.getChapterByNumber = async (req, res) => {
    try {
        const { storyId, chapternum } = req.params
        const chapter = await Chapter.findOne({
            where: { story_id: storyId, chapternum },
        })

        if (!chapter) {
            return res.status(404).json({ message: "Không tìm thấy chương số " + chapternum})
        }

        res.json(chapter)
    } catch (error) {
        res.status(500).json({message: error.message + "Lỗi khi lấy chương só " + chapternum})
    }
}

// Thêm Chương mới
exports.createChapter = async (req, res) => {
    try {
        const { story_id, chapternum, chaptername, content } = req.body

        // Kiểm tra truyện có tồn tại không
        const story = await Story.findByPk(story_id)
        if (!story) 
            return res.status(404).json({message: "Không tìm thấy truyện với id = " + story_id})

        // Kiểm tra chương đã tồn tại chưa
        const existingChapter = await Chapter.findOne({
            where: { story_id, chapternum },
        })

        if (existingChapter) 
            return res.status(400).json({message: "Chương số " + chapternum + " đã tồn tại"})
        
        const newChapter = await Chapter.create({ story_id, chapternum, chaptername, content })
        res.status(201).json(newChapter)
    } catch (error) {
        res.status(500).json({message: error.message + "Lỗi khi thêm chương"})
    }
}


// Cập nhật chương
exports.updateChapter = async (req, res) => {
    try {
        const { storyId, chapternum } = req.params

        const chapter = await Chapter.findOne({
            where: { story_id: storyId, chapternum },
        })

        if (!chapter) 
            return res.status(404).json({message: "Không tìm thấy chương với id truyện = " + req.params.storyId})

        await chapter.update(req.body)
        res.json(chapter)
    } catch (error) {
        res.status(500).json({message: error.message + "Lỗi khi cập nhật chương"})
    }
}

// Xóa chương
exports.deleteChapter = async (req, res) => {
    try {
        const { storyId, chapternum } = req.params;

        const chapter = await Chapter.findOne({
            where: { story_id: storyId, chapternum },
        });
        if (!chapter) 
            return res.status(404).json({message: "Không tìm thấy chương với id truyện = " + req.params.storyId})
        await chapter.destroy()
        res.json({message: "Xóa chương " + chapternum + "thành công!"})
    } catch (error) {
        res.status(500).json({message: error.message + "Lỗi khi xóa chương"})
    }
}