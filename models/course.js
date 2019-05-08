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

    teacher: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],

    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],

    content: [{ order: Number, lesson: Object }],

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
    comments: { type: Schema.Types.ObjectId, ref: "Thread" },

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
