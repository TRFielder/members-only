const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" }, //Reference to the user who posted the message
  text: { type: String, maxLength: 280, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
});

MessageSchema.virtual("date").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_FULL);
});

module.exports = mongoose.model("Message", MessageSchema);
