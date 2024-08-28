const mongoose = require("mongoose");

const AboutSchema = mongoose.Schema(
  {
    company_name: {
      type: String,
      required: [true, "Please enter company name."],
    },
    description: {
      type: String,
      required: [true, "Please enter description."],
    },
    briefing: {
      type: String,
      maxLength: 350,
      required: [true, "Please enter briefing."],
    },
    mission: {
      type: String,
      required: [true, "Please enter mission."],
    },
    vision: {
      type: String,
      required: [true, "Please enter vision."],
    },
    core_values: {
      type: Array,
      required: [true, "Please enter core values"],
    },
    image_one: {
      type: String,
      required: [true, "Please add image one"],
    },
    image_two: {
      type: String,
      required: [true, "Please add image one"],
    },
  },
  {
    timestamps: true,
  }
);

const About = mongoose.model("About", AboutSchema);

module.exports = About;
