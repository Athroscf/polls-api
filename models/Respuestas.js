const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswersSchema = new Schema({
    pollCode: {
        type: Schema.ObjectId,
        ref: "Poll"
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

module.exports = mongoose.model('Answers', AnswersSchema);