const factory = require("./handlerFactory");

const SubSkill = require("../models/SkillSubCategoryModel")
const GeneralNotifcation = require("../models/GeneralNotificationModel")

exports.createSubSkill = factory.createOne(SubSkill)
// exports.updateSubSkill = factory.updateOne(SubSkill)
exports.getAllSubSkills = factory.getAll(SubSkill)

exports.updateSubSkill = async(req,res) => {
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        const notification = await GeneralNotifcation.create({
            refOfUser:null,
            Content:`A subskill has been changed`,
            for:"Coach"
        })
    
        if (!doc) {
          return res.status(404).json({
            status: "fail",
            message: "No document found with that ID",
          });
        }
    
        res.status(200).json({
          status: "success",
          data: doc,
        });
      } catch (err) {
        res.status(404).json({
          status: "fail",
          message: "No document found with that ID",
        });
      }
}

exports.deleteSubSkill = async(req,res,next) => {
    try {
        const deletedSubSkill = await SubSkill.deleteOne({_id:req.params.C_id})
        const notification = await GeneralNotifcation.create({
            refOfUser:null,
            Content:`A subskill has been deleted`,
            for:"Coach"
        })
        res.status(200).json({
            status: "success",
          });

    }
    catch(err) {
        return res.status(404).json({
            status: "fail",
            message: err.message,
          });
    }
}