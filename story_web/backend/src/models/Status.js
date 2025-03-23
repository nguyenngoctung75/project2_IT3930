const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Story = require("./Story.js")

const Status = sequelize.define("Status", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  story_id: { type: DataTypes.INTEGER, references: { model: Story, key: "id" } },
  story_status: { type: DataTypes.STRING, allowNull: false }, // Ví dụ: "Đang cập nhật", "Hoàn thành"
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: "status",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

module.exports =  Status;