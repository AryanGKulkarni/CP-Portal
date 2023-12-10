const mongoose = require('mongoose');
const {Schema} = mongoose;

const BookmarksSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    contestId:{
        type: String,
        required: true
    },
    index:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    tags:{
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('bookmark',BookmarksSchema);