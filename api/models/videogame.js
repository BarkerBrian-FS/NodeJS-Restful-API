const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    developer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Game", videoSchema);