var express = require("express");
var router = express.Router();

const DailyRecordController = require("../controller/DailyRecordController");

//GetRoutes

router
  .route("/GetDailyRecordsOfPlayer/:id")
  .get(DailyRecordController.getDailyRecordsOfPlayer);

router
  .route("/GetHighestScoreOfPlayer/:id")
  .get(DailyRecordController.getHighestScoreOfPlayer);

module.exports = router;
