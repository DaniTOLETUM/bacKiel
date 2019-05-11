const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }]
});

categorySchema.index({ name: 2 }, { unique: true });
const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
