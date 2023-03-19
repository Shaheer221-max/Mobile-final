var express = require('express');
var router = express.Router();

const SkillController = require("../controller/SkillController")
const SKillSubCategoryController = require("../controller/SkillSubCategoryController")
//Post routes
router.route("/CreateSkill").post(
    SkillController.createSkill
)

router.route("/AddSubSkill/:id").post( //We need group id and user id
    SkillController.addSubCatInSkill
)



//Get Routes
router.route("/GetAllSkills").get(
    SkillController.getAllSkills
)

router.route("/GetAllSubSkills").get(
    SKillSubCategoryController.getAllSubSkills
)
router.route("/GetAllSubSkillsOfSkill/:id").get(
    SkillController.getAllSubskillsofSkill
)


//Put Routes
router.route("/UpdateSkill/:id").put(
    SkillController.updateSkill
)

router.route("/UpdateSubSkill/:id").put(
    SKillSubCategoryController.updateSubSkill
)

//Delete Routes
router.route("/DeleteSkill/:id").delete(
    SkillController.deleteSkill
)

router.route("/RemoveSubSkill/:C_id&:S_id").post(
    SkillController.removeSubCatInSkill,
    SKillSubCategoryController.deleteSubSkill
)





module.exports = router;