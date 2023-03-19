var express = require('express');
var router = express.Router();

const AttendanceController = require("../controller/AttendanceController")

//Post Routes
router.route("/MarkAttendance").post(
    AttendanceController.createAttendance
)
//Get Routes
router.route("/GetAttendance/:id").get(
    AttendanceController.getAttendance
)
router.route("/GetAttendanceOfPlayer/:id").get(
    AttendanceController.getAttendanceofPlayer
)



router.route("/GetAllAttendance").get(
    AttendanceController.getAllAttendance
)
module.exports = router;