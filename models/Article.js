
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const CommentsSchema= require('../models/Comments')

const ArticleSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, require: true },
  name: { type: String },
  productImage: { type: String, require: true },
  likes: [{ user: { type: Schema.Types.ObjectId, ref: "User" } }],
 comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      comment: { type: String, required: true },
      index: { type: Number },
      date: { type: Date, default: Date.now() },
    },
  
    
  ],
 

 });

module.exports = Article = mongoose.model("Article", ArticleSchema)
