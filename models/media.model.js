const mongoose = require("mongoose");

const MediaSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title."],
      maxLength: 150,
    },
    type: {
      type: String,
      required: [true, "Please enter type."],
      maxLength: 45,
    },
    category: {
      type: String,
      required: [true, "Please enter tag."],
      maxLength: 45,
    },
    tag: {
      type: String,
      required: [true, "Please enter tag."],
      maxLength: 120,
    },
    image: {
      type: String,
      required: false,
      maxLength: 500,
    },
    status: {
      type: Number,
      max: 2,
      required: [true, "The status is required"],
      default: 0,
    },
    deleted_at: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model("Media", MediaSchema);

module.exports = Media;
