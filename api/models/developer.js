const mongoose = require('mongoose');

const developSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Developer", developSchema);