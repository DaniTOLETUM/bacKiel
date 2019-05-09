const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const lessonSchema = new Schema({
  title: String,
  description: String,
  content: String,
  order: Number
});

const lessonModel = mongoose.model("Lesson", lessonSchema);

module.exports = lessonModel;
