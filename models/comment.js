const mongoose = require('mongoose');

// define Schema
const commentSchema = mongoose.Schema({
  name: String,
  comment: String,
  date: Date,
  article_id: Number
});

// define Model
module.exports = mongoose.model('Comment', commentSchema);