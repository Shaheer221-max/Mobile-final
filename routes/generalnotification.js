var express = require("express");
var router = express.Router();

const GeneralNotificationController = require("../controller/GeneralNotifcationController")

//Get routes
router.route("/GetPlayerGeneralNotifications/:id").get(
    GeneralNotificationController.getGeneralNotificationsofUser
)


router.route("/GetCoachesAllGeneralNotifications").get(
    GeneralNotificationController.getGeneralNotificationsofAllCoaches
)

router.route("/GetPlayerAllGeneralNotifications").get(
    GeneralNotificationController.getGeneralNotificationsofAllPlayers
)
module.exports = router;