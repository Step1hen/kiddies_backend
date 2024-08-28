const express = require("express");
const router = express.Router();
const {
  getAbout,
  getAboutById,
  createAbout,
  updateAbout,
} = require("../controllers/about.controller.js");

router.get("/", getAbout);
router.get("/:id", getAboutById);
router.post("/", createAbout);
router.put("/:id", updateAbout);

module.exports = router;
