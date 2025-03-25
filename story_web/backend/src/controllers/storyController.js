const { cleanContent } = require("../utils/cleanContent")
const Story = require("../models/Story")

//Lấy danh sách truyện
exports.getAllStories = async (req, res) => {
    try {
        const stories = await Story.findAll()

        // Làm sạch content trước khi gửi về client
        const cleanedStories = stories.map(story => ({
            ...story.toJSON(),
            content: cleanContent(story.content)  // Áp dụng hàm cleanContent
        }));
        // res.json(stories)

        res.status(200).json({ message: "Lấy danh sách truyện thành công", stories: cleanedStories });
    } catch (error) {
        res.status(500).json({message: error.message + "Lỗi khi lấy danh sách truyện"})
    }
}

// Lấy chi tiết truyện theo ID
exports.getStoryById = async (req, res) => {
    try {
        const story = await Story.findByPk(req.params.id)
        if (story) {
            res.json(story)
        } else {
            res.status(404).json({message: "Không tìm thấy truyện với id = " + req.params.id})
        }
    } catch (error) {
        res.status(500).json({message: error.message + "Lỗi khi lấy truyện theo id"})
    }
}

// Tạo truyện mới
exports.createStory = async (req, res) => {
    try {
        const { storyname, author, image, content, uploader_id } = req.body
        const newStory = await Story.create({ storyname, author, image, content, uploader_id })
        res.status(201).json(newStory)
    } catch (error) {
        res.status(500).json({message: error.message + "Lỗi khi tạo truyện"})
    }
}


// Cập nhật truyện
exports.updateStory = async (req, res) => {
    try {
        const story = await Story.findByPk(req.params.id)
        if (!story) 
            return res.status(404).json({message: "Không tìm thấy truyện với id = " + req.params.id})

        await story.update(req.body)
        res.json(story)
    } catch (error) {
        res.status(500).json({message: error.message + "Lỗi khi cập nhật truyện"})
    }
}

// Xóa truyện
exports.deleteStory = async (req, res) => {
    try {
        const story = await Story.findByPk(req.params.id)
        if (!story) 
            return res.status(404).json({message: "Không tìm thấy truyện với id = " + req.params.id})
        await story.destroy()
        res.json({message: "Xóa truyện thành công!"})
    } catch (error) {
        res.status(500).json({message: error.message + "Lỗi khi xóa truyện"})
    }
}