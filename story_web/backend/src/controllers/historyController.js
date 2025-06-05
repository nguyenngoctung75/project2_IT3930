const { ReadingHistory, Chapter, Story, User } = require("../models");

exports.addReadingHistory = async (req, res) => {
    try {
        const { userId, chapterId } = req.body;

        const user = await User.findOne({ where: { id: userId, deleted_at: null } });
        if (!user) {
            return res.status(404).json({ message: `Không tìm thấy người dùng với id = ${userId}` });
        }

        const chapter = await Chapter.findOne({ where: { id: chapterId, deleted_at: null } });
        if (!chapter) {
            return res.status(404).json({ message: `Không tìm thấy chương với id = ${chapterId}` });
        }

        const existingHistory = await ReadingHistory.findOne({
            where: { user_id: userId, chapter_id: chapterId, deleted_at: null },
        });

        if (existingHistory) {
            return res.status(200).json({ message: "Lịch sử đọc đã tồn tại!" });
        }

        const newHistory = await ReadingHistory.create({
            user_id: userId,
            chapter_id: chapterId,
        });

        res.status(201).json({ message: "Thêm lịch sử đọc thành công!", history: newHistory });
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Lỗi khi thêm lịch sử đọc` });
    }
};

exports.getReadingHistory = async (req, res) => {
    try {
        const { userId } = req.params;

        // const authUserId = req.user?.id;
        // if (!authUserId || authUserId.toString() !== userId) {
        //     return res.status(403).json({ message: "Không có quyền truy cập lịch sử của người dùng khác" });
        // }

        const history = await ReadingHistory.findAll({
            where: { user_id: userId, deleted_at: null },
            order: [["created_at", "DESC"]],
            include: [
                {
                    model: Chapter,
                    as: "chapter",
                    attributes: ["id", "chapternum", "chaptername"],
                    where: { deleted_at: null },
                    include: [
                        {
                            model: Story,
                            as: "story",
                            attributes: ["id", "storyname"],
                            where: { deleted_at: null },
                        },
                    ],
                },
            ],
        });

        const formattedHistory = history.map(item => ({
            storyId: item.chapter.story.id,
            storyName: item.chapter.story.storyname,
            chapternum: item.chapter.chapternum,
            chapterName: item.chapter.chaptername,
            lastRead: item.created_at,
        }));

        res.status(200).json(formattedHistory);
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Lỗi khi lấy lịch sử đọc` });
    }
};

// Thêm endpoint xóa lịch sử
exports.deleteReadingHistory = async (req, res) => {
    try {
        const { userId, chapterId } = req.params; // Lấy userId và chapterId từ URL

        // const authUserId = req.user?.id;
        // if (!authUserId || authUserId.toString() !== userId) {
        //     return res.status(403).json({ message: "Không có quyền xóa lịch sử của người dùng khác" });
        // }

        await ReadingHistory.destroy({
            where: { user_id: userId }
        });
        // const history = await ReadingHistory.findAll({
        //     where: { user_id: userId },
        // });

        // if (!history) {
        //     return res.status(404).json({ message: `Không tìm thấy lịch sử đọc với userId = ${userId}` });
        // }

        // Xóa mềm bằng cách đặt deleted_at
        // await history.update({ deleted_at: new Date() });
        // await history.destroy();
        res.status(200).json({ message: "Xóa lịch sử đọc thành công!" });
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Lỗi khi xóa lịch sử đọc` });
    }
};