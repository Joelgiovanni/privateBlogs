const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String },
  author: { type: String },
  body: { type: String },
  date: { type: String }
});

module.exports = Post = mongoose.model('posts', PostSchema);
