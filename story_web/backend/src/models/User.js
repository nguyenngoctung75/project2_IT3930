const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("author", "admin", "user"), defaultValue: "user" },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: "user",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

module.exports =  User;