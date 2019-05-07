const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: "No description provided"
  },

  owner: { type: Schema.Types.ObjectId, ref: "User" },

  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],

  modules: [
    {
      title: String,
      description: String,
      lessons: [{ title: String, subtitle: String, content: String }]
    }
  ],

  image: String,

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const productModel = mongoose.model("Course", productSchema);

module.exports = productModel;
