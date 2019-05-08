const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const tagSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  message: {
    type: String,
    required: true
  }
});

const tagModel = mongoose.model("Tag", tagSchema);

module.exports = tagModel;
