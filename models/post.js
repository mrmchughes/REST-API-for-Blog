const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let PostSchema = new Schema({
  isPublished: { default: false, type: Boolean },
  title: { type: String, required: true },
  user: { type: String, required: true },
  timestamp: { type: String, required: true },
  message: { type: String, required: true },
});

//Export model
module.exports = mongoose.model("Post", PostSchema);
