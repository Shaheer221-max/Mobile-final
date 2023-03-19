var express = require("express");
var router = express.Router();

const conversationController = require("../controller/conversationController");

router.route("/:id").get(conversationController.getUserConversation);
router.route("/").post(conversationController.addConversation);
router.route("/conversation/:id").post(conversationController.getConversationById);
router
  .route("/find/:firstUserId/:secondUserId")
  .get(conversationController.getUserConversation2);

router.route("/DeleteConversation/:id").delete(
  conversationController.deleteconversation
)
module.exports = router;
