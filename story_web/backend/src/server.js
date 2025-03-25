const sequelize = require('./config/database')
const app = require('./app')

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
});