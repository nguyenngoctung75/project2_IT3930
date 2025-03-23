const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const User = require("./User.js")
const Chapter = require("./Chapter.js");

const ReadingHistory = sequelize.define("ReadingHistory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  chapter_id: { type: DataTypes.INTEGER, references: { model: Chapter, key: "id" } },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: "reading_his",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

module.exports =  ReadingHistory;