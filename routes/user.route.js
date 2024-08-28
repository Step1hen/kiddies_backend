const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler.js");

const {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller.js");

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, getCurrentUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
