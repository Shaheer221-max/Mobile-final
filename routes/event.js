var express = require('express');
var router = express.Router();

const EventController = require("../controller/EventController")

//Get Routes
router.route("/GetEvents").get(
    EventController.getEvents
)


//Post Routes
router.route("/CreateEvent").post(
    EventController.createEvent
)

router.route("/CreateOffday").post(
    EventController.createOffday
)

//Update Routes
router.route("/UpdateEvent/:id").put(
    EventController.updateEvent
)

//Delete Routes
router.route("/DeleteEvent/:id").delete(
    EventController.deleteEvent
)


module.exports = router;