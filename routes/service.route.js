const express = require("express");
const router = express.Router();

const {
  createService,
  getServiceById,
  getServices,
  updateService,
  deleteService,
} = require("../controllers/service.controller.js");

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
