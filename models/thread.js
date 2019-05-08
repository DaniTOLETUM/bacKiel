const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const threadSchema = new Schema({
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

const threadModel = mongoose.model("Thread", threadSchema);

module.exports = threadModel;
