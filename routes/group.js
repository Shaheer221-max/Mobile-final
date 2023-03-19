var express = require('express');
var router = express.Router();

const GroupController = require("../controller/GroupController")


//Post routes
router.route("/CreateGroup").post(
    GroupController.createGroup
)
router.route("/CreateGroupOnly").post(
    GroupController.createGroupOnly
)

router.route("/AddMember/:U_id&:G_id").post( //We need group id and user id
    GroupController.addMemberInGroup
)



//Get Routes
router.route("/GetAllUserGroups/:id").get(
    GroupController.getAllUserGroups
)

router.route("/GetAllPlayerGroups/:id").get(
    GroupController.getAllPlayerGroups
)

router.route("/GetAllGroups").get(
    GroupController.getAllGroups
)
router.route("/GetGroup/:id").get(
    GroupController.getGroup
)

//Put Routes
router.route("/UpdateGroup/:id").put(
    GroupController.updateGroup
)

//Delete Routes
router.route("/DeleteGroup/:id").delete(
    GroupController.deleteGroup
)

router.route("/RemoveMember/:U_id&:G_id").post(
    GroupController.removeMemberfromGroup
)



module.exports = router;