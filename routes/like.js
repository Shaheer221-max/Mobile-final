var express = require("express");
var router = express.Router();

const LikeController = require("../controller/LikeController");

//Post Routes
router.route("/PostLike").post(LikeController.createLike);

//Delete Routes
router.route("/DeleteLike").post(LikeController.deleteLike);

module.exports = router;
