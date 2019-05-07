const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  ref: {
    type: String,
    required: true,
    validate: [
      val => /^iel\d{6}([A-Z]{1})$/.test(val),
      "the provided course reference is not valid"
    ]
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }
});

const productModel = mongoose.model("Course", productSchema);

module.exports = productModel;
