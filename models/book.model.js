const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title."],
      maxLength: 150,
    },
    category: {
      type: String,
      required: [true, "Please enter category."],
      maxLength: 45,
    },
    description: {
      type: String,
      required: false,
      maxLength: 450,
    },
    year_published: {
      type: String,
      required: [true, "Please enter year published."],
      maxLength: 4,
    },
    age_group: {
      type: String,
      required: [true, "Please enter age group."],
      maxLength: 45,
    },
    genre: {
      type: String,
      required: [true, "Please enter genre"],
      maxLength: 45,
    },
    diversity: {
      type: String,
      required: false,
      maxLength: 120,
    },
    theme: {
      type: String,
      required: false,
      maxLength: 120,
    },
    award_status: {
      type: Number,
      required: [true, "Please enter award status"],
      max: 2,
      default: 0,
    },
    rating: {
      type: Number,
      required: [true, "Please enter rating"],
      max: 5,
      maxLength: 2,
      default: 0,
    },
    author: {
      type: String,
      required: false,
      maxLength: 120,
    },
    image: {
      type: String,
      required: false,
      maxLength: 335,
    },
    url: {
      type: String,
      required: false,
      maxLength: 335,
    },
    status: {
      type: Number,
      max: 2,
      required: [true, "The status ia required"],
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

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
