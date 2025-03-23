const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config(); // Load biến môi trường từ .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Tắt log SQL
  }
);

module.exports = sequelize; // Phải export đúng