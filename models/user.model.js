const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name."],
      maxLength: 80,
    },
    email: {
      type: String,
      required: [true, "Please enter user email address."],
      maxLength: 80,
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please enter password."],
      maxLength: 350,
    },
    location: {
      type: String,
      required: false,
      maxLength: 255,
    },
    interests: {
      type: Array,
      required: false,
      default: null,
    },
    user_type: {
      type: String,
      required: false,
      maxLength: 45,
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

const User = mongoose.model("User", UserSchema);

module.exports = User;
