const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },

    userName: {
      type: String
    },

    email: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default:
        "https://vignette.wikia.nocookie.net/ghostintheshell/images/f/fe/Laughing_man.svg/revision/latest/scale-to-width-down/300?cb=20100909044445&path-prefix=en"
    },

    interests: [],

    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],

    finishedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],

    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },

    ratedCourses: { type: Schema.Types.ObjectId, ref: "Course" }
  },

  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

userSchema.index({ email: 1 }, { unique: true }); // ensure unique email
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
