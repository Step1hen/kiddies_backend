const express = require("express");
const router = express.Router();
const Book = require("../models/book.model.js");
const paginatedResults = require("../middleware/paginateResponseHandler.js");

const {
  createBook,
  getBookById,
  getBooks,
  getAllBooks,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller.js");

router.get("/catalog/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.get("/", paginatedResults(Book), getBooks); // GET paginated response

module.exports = router;
