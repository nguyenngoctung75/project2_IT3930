
// Import từng model
const Story = require("./Story");
const Type = require("./Type");
const Chapter = require("./Chapter");
const User = require("./User");
const Comment = require("./Comment");
const Favorites = require("./Favorites");
const ReadingHistory = require("./ReadingHistory");
const Status = require("./Status");
const Ratings = require("./Ratings");

Story.hasMany(Type, { foreignKey: "story_id", as: "types", onDelete: "CASCADE" });
Type.belongsTo(Story, { foreignKey: "story_id", as: "story" });

Story.hasMany(Chapter, { foreignKey: 'story_id', as: 'chapters', onDelete: 'CASCADE' });
Chapter.belongsTo(Story, { foreignKey: 'story_id' });

module.exports = {
    Story,
    Type,
    Chapter,
    User,
    Comment,
    Favorites,
    ReadingHistory,
    Status,
    Ratings
};