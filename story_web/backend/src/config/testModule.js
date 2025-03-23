const sequelize = require("./database.js");
const User = require("../models/User.js");
const Story = require("../models/Story.js");
const Ratings = require("../models/Ratings.js");
const Favorites = require("../models/Favorites.js");
const Comment = require("../models/Comment.js");
const Chapter = require("../models/Chapter.js");
const ReadingHistory = require("../models/ReadingHistory.js");
const Status = require("../models/Status.js");
const Type = require("../models/Type.js");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối MySQL thành công!");

    await sequelize.sync({ force: false });
    console.log("Các bảng Sequelize đã được đồng bộ!");

    // Kiểm tra thử insert 1 user
    const newUser = await User.create({
        email: "test@example.com",
        password: "123456",
        username: "TestUser",
        role: "user",
    });
    console.log("Tạo user thành công:", newUser.toJSON());

    // Kiểm tra insert dữ liệu vào bảng Story
    const newStory = await Story.create({
        uploader_id: newUser.id,
        storyname: "Câu chuyện thử nghiệm",
        author: "Tác giả Test",
        image: "test.jpg",
    });
    console.log("Tạo truyện thành công:", newStory.toJSON());

    // Kiểm tra insert dữ liệu vào bảng Favorites
    const favorite = await Favorites.create({
        user_id: newUser.id,
        story_id: newStory.id,
    });
    console.log("Thêm vào danh sách yêu thích:", favorite.toJSON());

    // Kiểm tra insert dữ liệu vào bảng Ratings
    const rating = await Ratings.create({
        user_id: newUser.id,
        story_id: newStory.id,
        rating: 5.0,
    });
    console.log("Đánh giá truyện thành công:", rating.toJSON());

    // Kiểm tra insert dữ liệu vào bảng Comment
    const comment = await Comment.create({
        story_id: newStory.id,
        user_id: newUser.id,
        content: "Truyện rất hay!",
    });
    console.log("Bình luận thành công:", comment.toJSON());

    // Kiểm tra insert dữ liệu vào bảng Status
    const status = await Status.create({
        story_id: newStory.id,
        story_status: "Đang cập nhật",
    });
    console.log("Cập nhật trạng thái truyện thành công:", status.toJSON());

    // Kiểm tra insert dữ liệu vào bảng Type
    const type = await Type.create({
        story_id: newStory.id,
        story_type: "Phiêu lưu",
    });
    console.log("Gán thể loại truyện thành công:", type.toJSON());

  } catch (error) {
    console.error("Lỗi khi kiểm tra models:", error);
  }
})();
