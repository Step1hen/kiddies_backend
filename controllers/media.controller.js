const asyncHandler = require("express-async-handler");
const Media = require("../models/media.model.js");

// Method: GET
// Route: /media
const getMedia = asyncHandler(async (req, res) => {
  res.json(res.paginatedResults);
});

// Method: GET
// Route: /media/catalog
const getAllMedia = asyncHandler(async (req, res) => {
  const media = await Media.find({});
  res.status(200).json(media);
});

// Method: GET
// Route: /media/:id
const getMediaById = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id, req.body);

  if (!media) {
    res.status(404);
    throw new Error("No media data found");
  }

  res.status(200).json(media);
});

// Method: POST
// Route: /media/
const createMedia = asyncHandler(async (req, res) => {
  const media = await Media.create(req.body);
  console.log(media);
  res.status(200).json(media);
});

// Method: PUT
// Route: /media/:id
const updateMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const media = await Media.findById(id);

  if (!media) {
    res.status(404);
    throw new Error("No media data found");
  }

  const updatedMedia = await Media.findByIdAndUpdate(id, req.body);
  res.status(200).json(updatedMedia);
});

// Method: DELETE
// Route: /media/:id
const deleteMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const media = await Media.findById(id);

  if (!media) {
    res.status(404);
    throw new Error("No media data found");
  }

  await Media.deleteOne({
    _id: id,
  });

  res
    .status(200)
    .json({ message: "Media with ID: " + id + " deleted successfully." });
});

module.exports = {
  getMedia,
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
};
