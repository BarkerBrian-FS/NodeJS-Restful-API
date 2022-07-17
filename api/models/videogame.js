const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    title: String,
    developer: String
});

module.exports = mongoose.model("Game", videoSchema);