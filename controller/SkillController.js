const factory = require("./handlerFactory");

const Skill = require("../models/SkillModel")
const SubSkill = require("../models/SkillSubCategoryModel")
const GeneralNotifcation = require("../models/GeneralNotificationModel")

// exports.createSkill = factory.createOne(Skill)
// exports.updateSkill = factory.updateOne(Skill)
exports.getAllSkills = factory.getAll(Skill)

exports.updateSkill = async (req,res) => {
    try {
        const doc = await Skill.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        const notification = await GeneralNotifcation.create({
            refOfUser:null,
            Content:`A skill has been changed`,
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

exports.createSkill = async(req,res) => {
    try {
        const doc = await Skill.create(req.body);
        const notification = await GeneralNotifcation.create({
            refOfUser:null,
            Content:`A new skill has been added`,
            for:"Coach"
        })
        res.status(201).json({
          status: "success",
    
          data: {
            doc,
          },
        });
      } catch (err) {
        console.log(err);
        res.status(404).json({
          status: "fail",
          message: err.message,
        });
      }
}

exports.getAllSubskillsofSkill = async (req, res, next) => {
    try {
      const AllSubskills = await Skill.find({ _id: req.params.id }).populate([
        { path: "subskills" }
      ]);
      res.status(200).json({
        status: "success",
        result: AllSubskills.length,
        data: AllSubskills,
      });
    } catch (err) {
      return res.status(404).json({
        status: "Failed",
        message: err.message,
      });
    }
  };


//adding sub category in skill
exports.addSubCatInSkill = async(req,res,next) => {
    try {
        //First we find the group
        const skill = await Skill.findOne({_id:req.params.id})
        if (skill) {
            //This is to check whether the member is already in the group or not
            const subskill = await SubSkill.create({
                subskillname:req.body.subskillname,
                refOfSkill:req.params.id
            })

            const notification = await GeneralNotifcation.create({
                refOfUser:null,
                Content:`A new subskill  has been added in a skill`,
                for:"Coach"
            })
            
            try {
                //We push/add the group id in the group members array
                const updateSkill = await Skill.updateOne({_id:req.params.id},{
                    $push:{
                        subskills: subskill._id
                    }
                    
                })
                res.status(200).json({
                    status:"success",
                    data: this.updateSkill
                })

            }
            catch (err) {
                return res.status(404).json({
                    status:"Failed",
                    message: err.message
                })
            }
        }

    }
    catch (err) {
        return res.status(404).json({
            status:"Failed",
            message: err.message
        })
    }
}
//Removing sub category in skill
exports.removeSubCatInSkill = async(req,res,next) => {
    try {
        //First we find the group
        const skill = await Skill.findOne({_id:req.params.S_id})
        console.log(skill)
        if (skill) {
            //This is to check whether the member is already in the group or not
            const already = skill.subskills.some(subskill => subskill._id == req.params.C_id)
            if(!already){
                
                return res.status(404).json({
                    status:"Failed",
                    msg: 'This SubCategory is not in this skill'
                })
            }
            try {
                //We push/add the group id in the group members array
                const updateSkill = await Skill.updateOne({_id:req.params.S_id},{
                    $pull:{
                        subskills: req.params.C_id
                    }
                    
                })
                const notification = await GeneralNotifcation.create({
                    refOfUser:null,
                    Content:`A subskill has been removed
                    from a skill `,
                    for:"Coach"
                })
                next()

            }
            catch (err) {
                return res.status(404).json({
                    status:"Failed",
                    message: err.message
                })
            }
        }

    }
    catch (err) {
        return res.status(404).json({
            status:"Failed",
            message: err.message
        })
    }
}


exports.deleteSkill = async(req, res, next) => {
    try {
        const deletedSkill = await Skill.findOne({_id:req.params.id})
        await deletedSkill.deleteOne()
        const notification = await GeneralNotifcation.create({
            refOfUser:null,
            Content:`A skill has been removed`,
            for:"Coach"
        })
        res.status(200).json({
            status:"success"
        })

    }
    catch(err) {
        return res.status(404).json({
            status:"Failed",
            message: err.message
        })
    }
}

