const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const pathSchema = new Schema({
  courses: [
    {
      order: { type: Number, required: true },
      course: { type: Schema.Types.ObjectId, ref: "Course" }
    }
  ]
});

const pathModel = mongoose.model("Path", pathSchema);

module.exports = pathModel;
