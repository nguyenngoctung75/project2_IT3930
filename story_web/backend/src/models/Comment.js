const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const User = require("./User.js");
const Story = require("./Story.js");

const Comment = sequelize.define("Comment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  story_id: { type: DataTypes.INTEGER, references: { model: Story, key: "id" } },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  reply_user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" }, allowNull: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: "comment",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

module.exports = Comment;