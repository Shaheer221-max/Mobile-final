var express = require('express');
var router = express.Router();

const CommentController = require("../controller/CommentController")
const NewsFeedController = require("../controller/NewsFeedController")



//Post Routes
router.route("/PostComment").post(
    CommentController.createComment,
)

router.route("/AddReplyToComment/:C_id").post(
    CommentController.addReplyToComment
)

//Delete Routes
router.route("/DeleteComment/:id").delete(
    CommentController.deleteComment
)

//Update Routes
router.route("/UpdateComment/:id").put(
    CommentController.updateComment
)
module.exports = router;