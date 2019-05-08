const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const commentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: {
    type: String,
    required: true
  }
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
