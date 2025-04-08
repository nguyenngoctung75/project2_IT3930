const { cleanContent } = require("../utils/cleanContent")
const Story = require("../models/Story")
const Type = require("../models/Type")

//Lấy danh sách truyện
exports.getAllStories = async (req, res) => {
    try {
        const stories = await Story.findAll()

        // Làm sạch content trước khi gửi về client
        // const cleanedStories = stories.map(story => ({
        //     ...story.toJSON(),
        //     content: cleanContent(story.content)  // Áp dụng hàm cleanContent
        // }));
        res.json(stories)

        // res.status(200).json({ message: "Lấy danh sách truyện thành công", stories: cleanedStories });
    } catch (error) {
        res.status(500).json({message: error.message + "Lỗi khi lấy danh sách truyện"})
    }
}

// API lấy danh sách truyện theo thể loại
exports.getStoriesByType = async (req, res) => {
    try {
        // Map slug đến tên thể loại
        const slugToType = {
            'tien-hiep': 'Tiên Hiệp',
            'kiem-hiep': 'Kiếm Hiệp',
            'ngon-tinh': 'Ngôn Tình',
            // Thêm các mapping khác tại đây
        };

        const typeSlug = req.params.category;
        const typeName = slugToType[typeSlug] || typeSlug;

        // Lấy danh sách story có type trùng khớp
        const stories = await Story.findAll({
            include: [{
                model: Type,
                as: 'types',
                where: { story_type: typeName },
                attributes: [], // Chỉ lọc, không lấy dữ liệu type
                required: true // Sử dụng INNER JOIN thay vì LEFT JOIN
            }],
            order: [['created_at', 'DESC']] // Sắp xếp mới nhất trước
        });

        if (stories.length === 0) {
            return res.status(404).json({ 
                message: `Không tìm thấy truyện thuộc thể loại ${typeName}` 
            });
        }

        res.json(stories);

    } catch (error) {
        console.error('Lỗi khi lấy truyện theo thể loại:', error);
        res.status(500).json({ 
            message: "Đã xảy ra lỗi khi tải truyện theo thể loại",
            // error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
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