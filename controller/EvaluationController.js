const factory = require("./handlerFactory");

const Evaluation = require("../models/EvaluationModel");
const Skill = require("../models/SkillModel");
const SkillSub = require("../models/SkillSubCategoryModel");
const GeneralNotification = require("../models/GeneralNotificationModel");

exports.createEvaluation = async (req, res, next) => {
  const scores = req.body.scores;
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  try {
    const skill = await Skill.findOne({ _id: req.body.refOfSkill });
    if (skill) {
      const subskills = await SkillSub.find({ refOfSkill: skill._id });
      const evaluationscores = subskills.map((value, index) => {
        const container = {};
        container["refOfSubSkill"] = value._id;
        container["score"] = scores[index];
        return container;
      });
      const evaluation = new Evaluation({
        refOfPlayer: req.body.refOfPlayer,
        refOfSkill: req.body.refOfSkill,
        scores: evaluationscores,
        avgScore: avgScore,
        isMarked: req.body.isMarked,
        date: req.body.date,
      });
      const notification = await GeneralNotification.create({
        refOfUser: req.body.refOfPlayer,
        Content: `One of your Skills has been evaluated`,
        for: "Player",
      });
      evaluation.save();
      next();
    }
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.viewSubskills = async (req, res, next) => {
  try {
    const skill = await Skill.findOne({ _id: req.params.id });
    if (skill) {
      const subskills = await SkillSub.find({ refOfSkill: skill._id });
      res.status(200).json({
        status: "success",
        result: subskills.length,
        data: subskills,
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getAllEvaluationbyDate = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.find({ date: req.params.date });

    res.status(200).json({
      status: "success",
      result: evaluation.length,
      data: evaluation,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getAllEvaluationofPlayer = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.find({ refOfPlayer: req.params.id });

    res.status(200).json({
      status: "success",
      result: evaluation.length,
      data: evaluation,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getAllEvaluationOfPlayerAndDate = async (req, res, next) => {
  const todayDate = new Date();
  console.log(todayDate);
  try {
    const evaluation = await Evaluation.find({
      date: todayDate,
      refOfPlayer: req.params.id,
    });

    res.status(200).json({
      status: "success",
      result: evaluation.length,
      data: evaluation,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getAvgScoreOfDay = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.find(
      { date: req.params.date, refOfPlayer: req.params.id },
      { avgScore: 1, _id: 0, refOfSkill: 0 }
    );

    const scores = evaluation.map((value) => value.avgScore);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    res.status(200).json({
      status: "success",
      data: avgScore,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getTopProspects = async (req, res) => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const prospects = await Evaluation.find(
      { date: { $gte: oneWeekAgo } },
      { refOfSkill: 0, scores: 0, isMarked: 0 }
    )
      .sort({ avgScore: -1 })
      .limit(8)
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

exports.getAllEvaluation = factory.getAll(Evaluation);
