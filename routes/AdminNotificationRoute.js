var express = require("express");
var router = express.Router();

const UserController = require("../controller/UserController");
const AdminNotificationController = require("../controller/AdminNotificationController");

router.get(
  "/getNotification",
  UserController.protect,
  AdminNotificationController.getNotification
);

router.post(
  "/postNotification",

  AdminNotificationController.AddNotification
);

router.delete(
  "/deleteNotification/:id",
  UserController.protect,
  // UserController.restrictTo("admin"),
  AdminNotificationController.deleteNotification
);

module.exports = router;
