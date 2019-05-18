const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const threadSchema = new Schema({
  comments: [
    {
      owner: { type: Schema.Types.ObjectId, ref: "User" },
      message: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const threadModel = mongoose.model("Thread", threadSchema);

module.exports = threadModel;
