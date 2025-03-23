const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const User = require("./User.js")
const Story = require("./Story.js")

const Ratings = sequelize.define("Ratings", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  story_id: { type: DataTypes.INTEGER, references: { model: Story, key: "id" } },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  rating: { type: DataTypes.DOUBLE, allowNull: false },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: "ratings",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

module.exports =  Ratings;