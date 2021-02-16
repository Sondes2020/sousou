// require router from express
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CommentsSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    text: {
        type: String,
        default: ''},

    Date: {
        type: Date,
        default: Date.now
    }
    });
    module.exports = Comment = mongoose.model("Comment", CommentsSchema);