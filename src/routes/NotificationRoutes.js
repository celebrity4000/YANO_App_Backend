const express = require("express");
const router = express.Router();

const NotificationController = require("../controllers/NotificationController");

router.post(
  "/sendNotificationToDoctors/:id",
  NotificationController.sendNotificationToDoctors
);

module.exports = router;
