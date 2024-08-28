const asyncHandler = require("express-async-handler");
const About = require("../models/about.model.js");

// Method: GET
// Route: /about
const getAbout = asyncHandler(async (req, res) => {
  const about = await About.find({});
  res.status(200).json(about);
});

// Method: GET
// Route: /about/:id
const getAboutById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const about = await About.findById(id);

  if (!about) {
    res.status(404);
    throw new Error("No data found");
  }

  res.status(200).json(about);
});

// Method: POST
// Route: /about
const createAbout = asyncHandler(async (req, res) => {
  const about = await About.create(req.body);
  res.status(200).json(about);
});

// Method: PUT
// Route: /about/:id
const updateAbout = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const about = await About.findById(id);

  if (!about) {
    res.status(404);
    throw new Error("No data found");
  }

  const updatedAbout = await About.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedAbout);
});

module.exports = {
  getAbout,
  getAboutById,
  createAbout,
  updateAbout,
};
