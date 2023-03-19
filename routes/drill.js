var express = require("express");
var router = express.Router();

const DrillController = require("../controller/DrillController");
//Post routes

router.route("/UploadDrill").post(
    DrillController.uploadDrill
)

//Update Routes
router.route("/UpdateDrill/:id").put(
    DrillController.updateDrill
)


//Delete Routes
router.route("/DeleteDrill/:id").delete(
    DrillController.deleteDrill
)


//Get Routes

router.route("/GetAllDrills").get(DrillController.getAllDrills);

module.exports = router;
