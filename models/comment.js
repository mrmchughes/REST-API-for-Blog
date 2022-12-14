const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let CommentSchema = new Schema({
  post: { type: Schema.ObjectId, ref: "Post", required: true },
  user: { type: String, required: true },
  timestamp: { type: String, required: true },
  message: { type: String, required: true },
});

//Export model
module.exports = mongoose.model("Comment", CommentSchema);
