const factory = require("./handlerFactory");

const Evaluation = require("../models/EvaluationModel");
const Record = require("../models/DailyRecordModel");

exports.createandUpdateDailyRecord = async (req, res) => {
  try {
    const presentRecord = await Record.findOne({
      refOfPlayer: req.body.refOfPlayer,
      date: req.body.date,
    });
    if (!presentRecord) {
      const evaluation = await Evaluation.findOne({
        refOfPlayer: req.body.refOfPlayer,
        date: req.body.date,
      });

      console.log(evaluation);
      const record = Record.create({
        refOfPlayer: req.body.refOfPlayer,
        date: req.body.date,
        avgScore: evaluation.avgScore,
      });
      res.status(200).json({
        msg: "record created",
        data: record,
      });
    } else {
      const evaluations = await Evaluation.find(
        { date: req.body.date, refOfPlayer: req.body.refOfPlayer },
        { avgScore: 1, _id: 0, refOfSkill: 0 }
      );

      const scores = evaluations.map((value) => value.avgScore);
      var avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

      const updatedRecord = await Record.findOneAndUpdate(
        {
          date: req.body.date,
          refOfPlayer: req.body.refOfPlayer,
        },
        {
          avgScore: avgScore,
        }
      );
      res.status(200).json({
        msg: "record updated",
        data: updatedRecord,
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getDailyRecordsOfPlayer = async (req, res) => {
  console.log("I am here");
  try {
    const dailyrecords = await Record.find({ refOfPlayer: req.params.id });
    res.status(200).json({
      status: "succcess",
      result: dailyrecords.length,
      data: dailyrecords,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};
exports.getHighestScoreOfPlayer = async (req, res) => {
  try {
    const highestscorerecord = await Record.find({ refOfPlayer: req.params.id })
      .sort({ avgScore: -1 })
      .limit(1)
      .exec(function (error, records) {
        if (error) {
          return res.status(404).json({
            status: "Failed",
            message: error.message,
          });
        } else {
          res.status(200).json({
            status: "success",
            result: records.length,
            data: records,
          });
        }
      });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};
