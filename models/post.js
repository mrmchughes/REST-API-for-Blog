const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let PostSchema = new Schema({
  isPublished: { type: Boolean },
  title: { type: String, required: true },
  user: { type: String, required: true },
  timestamp: { type: String, required: true },
  message: { type: String, required: true },
});

// Virtual for book's URL
PostSchema.virtual("url").get(() => {
  return `/posts/${this._id}`;
});

//Export model
module.exports = mongoose.model("Post", PostSchema);
