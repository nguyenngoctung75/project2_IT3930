const { cleanContent } = require("../utils/cleanContent")
const { Story, Type, Chapter } = require("../models")
const sequelize = require('../config/database');

//Lấy danh sách truyện
exports.getAllStories = async (req, res) => {
    try {
        const stories = await Story.findAll({
            attributes: {
                include: [
                    // Thêm trường đếm số chapter
                    [sequelize.fn('COUNT', sequelize.col('chapters.id')), 'chapterCount']
                ]
            },
            include: [
                {
                    model: Type,
                    as: "types", // phải đúng alias
                    attributes: ["id", "story_type"],
                },
                {
                    model: Chapter,
                    as: "chapters",
                    attributes: [],
                    required: false // LEFT JOIN thay vì INNER JOIN
                }
            ],
            group: [
                'Story.id',
                'Story.created_at', // Phải thêm vào group by nếu dùng trong order
                'types.id',        // Các trường trong include cũng phải thêm vào group
                'types.story_type'
            ], // Nhóm theo Story để đếm chapters
            order: [["created_at", "ASC"]],
            subQuery: false // Cho phép truy vấn phức tạp
        })

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
            'dam-my': 'Đam Mỹ',
            'quan-truong': 'Quan Trường',
            'vong-du': 'Võng Du',
            'khoa-huyen': 'Khoa Huyễn',
            'he-thong': 'Hệ Thống',
            'huyen-huyen': 'Huyền Huyễn',
            'di-gioi': 'Dị Giới',
            'di-nang': 'Dị Năng',
            'sac': 'Sắc',
            'quan-su': 'Quân Sự',
            'lich-su': 'Lịch Sử',
            'xuyen-khong': 'Xuyên Không',
            'xuyen-nhanh': 'Xuyên Nhanh',
            'trong-sinh': 'Trọng Sinh',
            'trinh-tham': 'Trinh Thám',
            'tham-hiem': 'Thám Hiểm',
            'linh-di': 'Linh Dị',
            'nguoc': 'Ngược',
            'sung': 'Sủng',
            'cung-dau': 'Cung Đấu',
            'nu-cuong': 'Nữ Cường',
            'gia-dau': 'Gia Đấu',
            'dong-phuong': 'Đông Phương',
            'do-thi': 'Đô Thị',
            'bach-hop': 'Bách Hợp',
            'hai-huoc': 'Hài Hước',
            'dien-van': 'Điền Văn',
            'co-dai': 'Cổ Đại',
            'mat-the': 'Mạt Thế',
            'truyen-teen': 'Truyện Teen',
            'phuong-tay': 'Phương Tây',
            'nu-phu': 'Nữ Phụ',
            'Light Novel': 'Light Novel',
            'viet-nam': 'Việt Nam',
            'doan-van': 'Đoản Văn',
            'review-sach': 'Review sách',
            'khac': 'Khác',
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
        const story = await Story.findByPk(req.params.id, {
            include: {
                model: Type,
                as: "types", // đúng alias
                attributes: ['id', 'story_type'] // lấy thông tin cần thiết
            }
        })
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