var express = require('express');
var router = express.Router();
const GroupConversationController = require("../controller/GroupConversationController");

router.route('/CreateGroupChat').post(
    GroupConversationController.createGroupChat
)

router.route("/AddMemberInGroupChat/:U_id&:G_id").post( //We need group id and user id
    GroupConversationController.addMemberInGroupChat
)

router.route('/send/:id').post(
    GroupConversationController.sendMessage

);
router.route('/messages/:id').get(
    GroupConversationController.getMessages
);
router.route("/RemoveMemberFromGroupChat/:U_id&:G_id").post(
    GroupConversationController.removeMemberfromGroupChat
)


router.route("/GetGroupChat/:id").get(GroupConversationController.getGroupConversation);

router.route("/GetGroupChatById/:id").get(GroupConversationController.getGroupConversationById);

router.route("/DeleteGroupChat/:id").delete(
    GroupConversationController.deleteGroupChat
)

module.exports = router;
