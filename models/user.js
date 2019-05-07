const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    username: {
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
    enroled: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    finished: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user"
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

userSchema.index({ email: 1 }, { unique: true }); // ensure unique email
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
