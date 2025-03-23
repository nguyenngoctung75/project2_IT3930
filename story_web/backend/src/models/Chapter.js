const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Story = require("./Story.js");

const Chapter = sequelize.define("Chapter", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  story_id: { type: DataTypes.INTEGER, references: { model: Story, key: "id" } },
  chaptername: { type: DataTypes.STRING, allowNull: false },
  chapternum: { type: DataTypes.INTEGER, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: "chapter",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

module.exports = Chapter;