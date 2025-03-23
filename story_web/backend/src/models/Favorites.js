const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const User = require("./User.js")
const Story = require("./Story.js")

const Favorites = sequelize.define("Favorites", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  story_id: { type: DataTypes.INTEGER, references: { model: Story, key: "id" } },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: "favorites",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

module.exports =  Favorites;