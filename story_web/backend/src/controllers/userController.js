// const { User } = require('../models');
// const path = require('path');
// const multer = require('multer');

// // Cấu hình multer để lưu trữ file
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     },
// });

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpeg|jpg|png/;
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = filetypes.test(file.mimetype);
//         if (extname && mimetype) {
//             return cb(null, true);
//         } else {
//             cb(new Error('Chỉ chấp nhận file ảnh (jpeg, jpg, png)!'));
//         }
//     },
//     limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
// }).single('avatar');

// // Lấy thông tin người dùng
// exports.getUser = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const authUserId = req.user?.id;

//         // if (!authUserId || authUserId.toString() !== userId) {
//         //     return res.status(403).json({ message: 'Không có quyền truy cập thông tin người dùng khác' });
//         // }

//         const user = await User.findOne({ where: { id: userId, deleted_at: null } });
//         if (!user) {
//             return res.status(404).json({ message: `Không tìm thấy người dùng với id = ${userId}` });
//         }

//         res.status(200).json({
//             username: user.username,
//             email: user.email,
//             avatar: user.avatar, // Đường dẫn đến ảnh đại diện
//         });
//     } catch (error) {
//         res.status(500).json({ message: `${error.message} - Lỗi khi lấy thông tin người dùng` });
//     }
// };

// // Cập nhật thông tin người dùng
// exports.updateUser = async (req, res) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(400).json({ message: err.message });
//             }

//             const { userId } = req.params;
//             const authUserId = req.user?.id;

//             // if (!authUserId || authUserId.toString() !== userId) {
//             //     return res.status(403).json({ message: 'Không có quyền cập nhật thông tin người dùng khác' });
//             // }

//             const user = await User.findOne({ where: { id: userId, deleted_at: null } });
//             if (!user) {
//                 return res.status(404).json({ message: `Không tìm thấy người dùng với id = ${userId}` });
//             }

//             const { username, email } = req.body;
//             const avatarPath = req.file ? `/uploads/${req.file.filename}` : user.avatar;

//             // Cập nhật thông tin
//             await user.update({
//                 username: username || user.username,
//                 email: user.email, // Email không cho phép chỉnh sửa
//                 avatar: avatarPath,
//             });

//             res.status(200).json({
//                 message: 'Cập nhật tài khoản thành công!',
//                 user: {
//                     id: user.id,
//                     username: user.username,
//                     email: user.email,
//                     avatar: user.avatar,
//                 },
//             });
//         });
//     } catch (error) {
//         res.status(500).json({ message: `${error.message} - Lỗi khi cập nhật thông tin người dùng` });
//     }
// };

const { User, Story, Chapter } = require('../models');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// 🔧 Tạo thư mục uploads nếu chưa tồn tại
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 📂 Cấu hình multer để lưu trữ file vào thư mục đảm bảo tồn tại
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Chỉ chấp nhận file ảnh (jpeg, jpg, png)!'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
}).single('avatar');

exports.getStats = async (req, res) => {
    try {
        const storyCount = await Story.count({ where: { deleted_at: null } });
        const chapterCount = await Chapter.count({ where: { deleted_at: null } });
        res.status(200).json({ storyCount, chapterCount });
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Lỗi khi lấy thống kê` });
    }
};

// 📥 Lấy thông tin người dùng
exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({ where: { id: userId, deleted_at: null } });
        if (!user) {
            return res.status(404).json({ message: `Không tìm thấy người dùng với id = ${userId}` });
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        });
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Lỗi khi lấy thông tin người dùng` });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // const authUserId = req.user?.id;
        // if (!authUserId || (await User.findOne({ where: { id: authUserId, role: 'admin', deleted_at: null } })) === null) {
        //     return res.status(403).json({ message: 'Chỉ admin mới có thể xem danh sách người dùng' });
        // }

        const users = await User.findAll({
            where: { deleted_at: null },
            attributes: ['id', 'username', 'email', 'role'],
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Lỗi khi lấy danh sách người dùng` });
    }
};

// 🖼️ Cập nhật thông tin người dùng (bao gồm upload ảnh)
exports.updateUser = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            const { userId } = req.params;

            const user = await User.findOne({ where: { id: userId, deleted_at: null } });
            if (!user) {
                return res.status(404).json({ message: `Không tìm thấy người dùng với id = ${userId}` });
            }

            const { username } = req.body;
            const avatarPath = req.file ? `/uploads/${req.file.filename}` : user.avatar;

            await user.update({
                username: username || user.username,
                email: user.email,
                useravatar: avatarPath,
            });

            res.status(200).json({
                message: 'Cập nhật tài khoản thành công!',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    avatar: user.useravatar,
                },
            });
        });
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Lỗi khi cập nhật thông tin người dùng` });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;
        const authUserId = req.user?.id;

        // if (!authUserId || (await User.findOne({ where: { id: authUserId, role: 'admin', deleted_at: null } })) === null) {
        //     return res.status(403).json({ message: 'Chỉ admin mới có thể cập nhật quyền' });
        // }

        const user = await User.findOne({ where: { id: userId, deleted_at: null } });
        if (!user) {
            return res.status(404).json({ message: `Không tìm thấy người dùng với id = ${userId}` });
        }

        if (user.role === 'admin') {
            return res.status(400).json({ message: 'Không thể thay đổi quyền của admin' });
        }

        await user.update({ role: role });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Lỗi khi cập nhật quyền` });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const authUserId = req.user?.id;

        // if (!authUserId || (await User.findOne({ where: { id: authUserId, role: 'admin', deleted_at: null } })) === null) {
        //     return res.status(403).json({ message: 'Chỉ admin mới có thể xóa người dùng' });
        // }

        const user = await User.findOne({ where: { id: userId, deleted_at: null } });
        if (!user) {
            return res.status(404).json({ message: `Không tìm thấy người dùng với id = ${userId}` });
        }

        if (user.role === 'admin') {
            return res.status(400).json({ message: 'Không thể xóa tài khoản admin' });
        }

        // await user.update({ deleted_at: new Date() });
        await User.destroy({ where: { id: userId } });
        res.status(200).json({ message: 'Xóa người dùng thành công' });
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Lỗi khi xóa người dùng` });
    }
};