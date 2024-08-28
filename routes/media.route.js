const express = require("express");
const router = express.Router();
const Media = require("../models/media.model.js");
const paginatedResults = require("../middleware/paginateResponseHandler.js");

const {
  createMedia,
  getMediaById,
  getMedia,
  getAllMedia,
  updateMedia,
  deleteMedia,
} = require("../controllers/media.controller.js");

router.get("/all/", getAllMedia);
router.get("/:id", getMediaById);
router.post("/", createMedia);
router.put("/:id", updateMedia);
router.delete("/:id", deleteMedia);
router.get("/", paginatedResults(Media), getMedia); // GET paginated response

module.exports = router;
