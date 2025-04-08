const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const User = require("./User.js")
const Type = require("./Type.js")

const Story = sequelize.define("Story", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  uploader_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  storyname: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
  content: { type: DataTypes.TEXT, allowNull: false },
  rating: { type: DataTypes.DOUBLE, defaultValue: 0 },
  num_rates: { type: DataTypes.INTEGER, defaultValue: 0 },
  num_views: { type: DataTypes.INTEGER, defaultValue: 0 },
  num_likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: "story",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

// Thiết lập quan hệ
Story.hasMany(Type, { foreignKey: "story_id", as: "types", onDelete: 'CASCADE' }); // Thêm tùy chọn này để tự động xóa type khi story bị xóa 

module.exports =  Story;