const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const moduleSchema = new Schema({
  title: String,
  order: Number,
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }]
});

const moduleModel = mongoose.model("Module", moduleSchema);

module.exports = moduleModel;
