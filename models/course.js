const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: "No description provided"
    },

    teacher: [{ type: Schema.Types.ObjectId, ref: "User" }],

    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],

    courseModules: [{ type: Schema.Types.ObjectId, ref: "Module" }],

    thread: { type: Schema.Types.ObjectId, ref: "Thread" },

    media: {
      image: String,
      video: String
    },

    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category"
      }
    ],

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Amateur"],
      default: "Intermediate"
    },

    rate: {
      type: Number
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;
