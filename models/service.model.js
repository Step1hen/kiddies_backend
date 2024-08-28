const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title."],
      maxLength: 255,
    },
    type: {
      type: String,
      required: [true, "Please enter type."],
      maxLength: 25,
    },
    description: {
      type: String,
      required: [true, "Please enter a description."],
      maxLength: 500,
    },
    icon: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: [true, "Please enter the url."],
      maxLength: 355,
    },
    status: {
      type: Number,
      max: 2,
      required: [true, "The status is required"],
      default: 0,
    },
    deleted_at: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
