const express = require("express");
const { getHealthTracker } = require("../controllers/HealthTrackerController");
const router = express.Router();

router.get("/:userId", getHealthTracker);

module.exports = router;
