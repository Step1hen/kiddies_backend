const asyncHandler = require("express-async-handler");
const Event = require("../models/event.model.js");
const User = require("../models/user.model.js");

// Method: GET
// Route: /event/
const getEvents = asyncHandler(async (req, res) => {
  const event = await Event.find({});
  res.status(200).json(event);
});

// Method: GET
// Route: /event/:id
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id, req.body);

  if (!event) {
    res.status(404);
    throw new Error("No event data found");
  }

  res.status(200).json(event);
});

// Method: POST
// Route: /event
const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);
  res.status(200).json(event);
});

// Method: PUT
// Route: /event/:id
const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);

  if (!event) {
    res.status(404);
    throw new Error("No event data found");
  }

  const updatedEvent = await Event.findByIdAndUpdate(id, req.body);
  res.status(200).json(updatedEvent);
});

// Method: DELETE
// Route: /event/:id
const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findById(id);

  if (!event) {
    res.status(404);
    throw new Error("No event data found");
  }

  await Event.deleteOne({
    _id: id,
  });

  res
    .status(200)
    .json({ message: "Event with ID: " + id + " deleted successfully." });
});

//@access private
// Method: GET & PUT
// Route: /event/:id
const registerEvent = asyncHandler(async (req, res) => {
  const userId = req.body.user_id;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("No user data found");
  }

  const eventId = req.body.event_id;
  const checkedEvent = await Event.findById(eventId);
  if (!checkedEvent) {
    res.status(404);
    throw new Error("No event data found");
  }

  // Create a Set to remove duplicates while maintaining insertion order
  const uniqueRegisteredUsers = new Set([
    ...checkedEvent.registered_users,
    userId,
  ]);

  const registeredEvent = await Event.findByIdAndUpdate(
    eventId,
    {
      registered_users: [...uniqueRegisteredUsers],
    },
    { new: true }
  );

  res.status(200).json(registeredEvent);
});

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerEvent,
};
