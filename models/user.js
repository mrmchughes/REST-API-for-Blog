const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, minLength: 8 },
  admin: { default: false, type: Boolean },
});

// Export models
module.exports = mongoose.model("User", UserSchema);
