var express = require("express");
var router = express.Router();

const EvaluationController = require("../controller/EvaluationController");
const DailyRecordController = require("../controller/DailyRecordController");

//Post Routes
router
  .route("/Evaluate")
  .post(
    EvaluationController.createEvaluation,
    DailyRecordController.createandUpdateDailyRecord
  );
//Get Routes
router.route("/ViewSubskills/:id").get(EvaluationController.viewSubskills);

router
  .route("/ViewDailyEvaluationsOfPlayerbyId/:id")
  .get(DailyRecordController.getDailyRecordsOfPlayer);

router.route("/GetTopProspects").get(EvaluationController.getTopProspects);

router
  .route("/ViewEvaluationsOfPlayer/:id")
  .get(EvaluationController.getAllEvaluationofPlayer);

router
  .route("/ViewEvaluationsByDate/:date")
  .get(EvaluationController.getAllEvaluationbyDate);

router
  .route("/ViewEvaluationsByDateOfPlayer/:id&:date")
  .get(EvaluationController.getAllEvaluationOfPlayerAndDate);
router
  .route("/ViewAvgScoreOfDay/:id&:date")
  .get(EvaluationController.getAvgScoreOfDay);
module.exports = router;
