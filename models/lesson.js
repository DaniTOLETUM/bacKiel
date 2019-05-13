const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const lessonSchema = new Schema({
  title: String,
  description: String,
  content: Object,
  order: Number,
  tags: { type: Schema.Types.ObjectId, ref: "Tag" }
});

const lessonModel = mongoose.model("Lesson", lessonSchema);

module.exports = lessonModel;
