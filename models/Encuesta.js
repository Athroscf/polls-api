const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    pollName: {
        type: String,
        trim: true,
        required: true
    },
    first: {
        type: String,
        required: true
    },
    second: {
        type: String,
        required: true
    },
    third: {
        type: String,
        required: true
    },
    fourth: {
        type: String,
        required: true
    },
    fifth: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Poll", PollSchema);