const { cleanContent } = require("../utils/cleanContent")
const { Story, Type, Chapter } = require("../models")
const sequelize = require('../config/database');
const { Op } = require('sequelize');

//Lấy danh sách truyện
exports.getAllStories = async (req, res) => {
    try {
        const { search } = req.query; // Lấy tham số tìm kiếm từ query
        let whereClause = {};

        if (search) {
            whereClause = {
                [sequelize.Op.or]: [
                    { storyname: { [sequelize.Op.like]: `%${search}%` } },
                    { author: { [sequelize.Op.like]: `%${search}%` } },
                ],
            };
        }

        const stories = await Story.findAll({
            where: whereClause,
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('chapters.id')), 'chapterCount'],
                ],
            },
            include: [
                {
                    model: Type,
                    as: "types",
                    attributes: ["id", "story_type"],
                },
                {
                    model: Chapter,
                    as: "chapters",
                    attributes: [],
                    required: false,
                },
            ],
            group: [
                'Story.id',
                'Story.created_at',
                'types.id',
                'types.story_type',
            ],
            order: [["created_at", "DESC"]],
            subQuery: false,
        });

        // Làm sạch content trước khi gửi về client (tùy chọn)
        // const cleanedStories = stories.map(story => ({
        //     ...story.toJSON(),
        //     content: cleanContent(story.content),
        // }));
        res.json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message + "Lỗi khi lấy danh sách truyện" });
    }
};

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
            attributes: {
                include: [
                    // Thêm trường đếm số chapter
                    [sequelize.fn('COUNT', sequelize.col('chapters.id')), 'chapterCount']
                ]
            },
            include: [
                {
                    model: Type,
                    as: 'types',
                    where: { story_type: typeName },
                    attributes: [], // Chỉ lọc, không lấy dữ liệu type
                    required: true // Sử dụng INNER JOIN thay vì LEFT JOIN
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
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('chapters.id')), 'chapterCount']
                ]
            },
            include: [
                {
                    model: Type,
                    as: "types", // đúng alias
                    attributes: ['id', 'story_type'] // lấy thông tin cần thiết
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
            ]
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

// Tạo truyện mới và lưu thể loại
exports.createStory = async (req, res) => {
    try {
        const { storyname, author, image, content, uploader_id, types } = req.body;

        // Tạo truyện mới
        const newStory = await Story.create({ storyname, author, image, content, uploader_id });

        // Lưu các thể loại vào bảng `type`
        if (types && Array.isArray(types) && types.length > 0) {
            const typeEntries = types.map(type => ({
                story_id: newStory.id,
                story_type: type,
            }));
            await Type.bulkCreate(typeEntries);
        }

        // Lấy lại thông tin truyện cùng với các thể loại
        const storyWithTypes = await Story.findByPk(newStory.id, {
            include: [
                {
                    model: Type,
                    as: "types",
                    attributes: ["id", "story_type"],
                },
            ],
        });

        res.status(201).json(storyWithTypes);
    } catch (error) {
        res.status(500).json({ message: error.message + "Lỗi khi tạo truyện" });
    }
};


// Cập nhật truyện
exports.updateStory = async (req, res) => {
    try {
        const { id } = req.params;
        const { storyname, author, image, content, types } = req.body;

        // Tìm truyện với điều kiện chưa bị xóa mềm
        const story = await Story.findOne({
            where: { id },
        });

        // Nếu không tìm thấy truyện
        if (!story) {
            return res.status(404).json({ message: `Không tìm thấy truyện với id = ${id}` });
        }

        // Kiểm tra dữ liệu đầu vào
        const updateData = {};
        if (storyname !== undefined) updateData.storyname = storyname;
        if (author !== undefined) updateData.author = author;
        if (image !== undefined) updateData.image = image;
        if (content !== undefined) updateData.content = content;

        // Nếu không có dữ liệu để cập nhật (ngoại trừ types)
        if (Object.keys(updateData).length === 0 && !types) {
            return res.status(400).json({ message: "Không có dữ liệu để cập nhật truyện" });
        }

        // Cập nhật thông tin truyện
        if (Object.keys(updateData).length > 0) {
            await story.update(updateData);
        }

        // Xử lý thể loại (types)
        if (types && Array.isArray(types)) {
            // Xóa các thể loại cũ
            await Type.destroy({ where: { story_id: story.id } });

            // Thêm các thể loại mới
            if (types.length > 0) {
                const newTypes = types.map(type => ({
                    story_id: story.id,
                    story_type: type,
                }));
                await Type.bulkCreate(newTypes);
            }
        }

        // Lấy lại thông tin truyện với thể loại mới
        const updatedStory = await Story.findByPk(story.id, {
            include: [
                {
                    model: Type,
                    as: "types",
                    attributes: ["id", "story_type"],
                },
            ],
        });

        // Trả về phản hồi với thông điệp thành công
        res.json({ message: `Cập nhật truyện "${storyname || story.storyname}" thành công!`, story: updatedStory });
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Lỗi khi cập nhật truyện` });
    }
};

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

exports.searchStories = async (req, res) => {
    try {
        const { tukhoa } = req.query;
        if (!tukhoa) {
            return res.status(400).json({ message: 'Thiếu từ khóa tìm kiếm' });
        }

        const stories = await Story.findAll({
            where: {
                storyname: {
                    [Op.like]: `%${tukhoa}%`, // Tìm kiếm không phân biệt chữ hoa/thường
                },
                deleted_at: null,
            },
            attributes: ['id', 'storyname', 'author'], // Chỉ lấy các trường cần thiết
        });

        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Lỗi khi tìm kiếm` });
    }
};