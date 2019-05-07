const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "general"
  },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
