const asyncHandler = require("express-async-handler");
const Book = require("../models/book.model.js");

// Method: GET
// Route: /book
const getBooks = asyncHandler(async (req, res) => {
  res.json(res.paginatedResults);
});

// Method: GET
// Route: /book/catalog
const getAllBooks = asyncHandler(async (req, res) => {
  const book = await Book.find({});
  res.status(200).json(book);
});

// Method: GET
// Route: /book/:id
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id, req.body);

  if (!book) {
    res.status(404);
    throw new Error("No book data found");
  }

  res.status(200).json(book);
});

// Method: POST
// Route: /book/
const createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(200).json(book);
});

// Method: PUT
// Route: /book/:id
const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    res.status(404);
    throw new Error("No book data found");
  }

  const updatedBook = await Book.findByIdAndUpdate(id, req.body);
  res.status(200).json(updatedBook);
});

// Method: DELETE
// Route: /book/:id
const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    res.status(404);
    throw new Error("No book data found");
  }

  await Book.deleteOne({
    _id: id,
  });

  res
    .status(200)
    .json({ message: "Book with ID: " + id + " deleted successfully." });
});

module.exports = {
  getBooks,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
