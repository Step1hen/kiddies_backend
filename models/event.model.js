const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name."],
      maxLength: 120,
    },
    description: {
      type: String,
      required: false,
    },
    briefing: {
      type: String,
      required: false,
      maxLength: 250,
    },
    category: {
      type: String,
      required: false,
      maxLength: 50,
    },
    host: {
      type: String,
      required: false,
      maxLength: 120,
    },
    location: {
      type: String,
      required: false,
      maxLength: 120,
    },
    date: {
      type: String,
      required: false,
      maxLength: 30,
    },
    url: {
      type: String,
      required: false,
      maxLength: 335,
    },
    rating: {
      type: Number,
      required: false,
      max: 6,
      default: 0,
    },
    image: {
      type: String,
      required: false,
      maxLength: 335,
    },
    status: {
      type: Number,
      max: 2,
      required: [true, "The status is required"],
      default: 0,
    },
    registered_users: {
      type: Array,
      required: false,
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

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
