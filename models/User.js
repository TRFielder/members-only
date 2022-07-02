const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
});

//Export model
module.exports = mongoose.model("User", UserSchema);
