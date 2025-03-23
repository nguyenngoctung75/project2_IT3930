const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Story = require("./Story.js")

const Type = sequelize.define("Type", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  story_id: { type: DataTypes.INTEGER, references: { model: Story, key: "id" } },
  story_type: { type: DataTypes.STRING, allowNull: false }, // Ví dụ: "Hành động", "Tình cảm"
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: "type",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

module.exports =  Type;