const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEventById,
  getEvents,
  updateEvent,
  deleteEvent,
  registerEvent,
} = require("../controllers/event.controller.js");

router.get("/", getEvents);
router.post("/", createEvent);
router.put("/register/", registerEvent);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
