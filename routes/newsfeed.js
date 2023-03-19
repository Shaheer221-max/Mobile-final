var express = require("express");
var router = express.Router();

const NewsFeedController = require("../controller/NewsFeedController");
const LikeController = require("../controller/LikeController");
const CommentController = require("../controller/CommentController");

//Post Routes

router.route("/PostNewsFeed").post(NewsFeedController.createNewsfeed);

router.route("/ShareNewsFeed").post(NewsFeedController.shareNewsfeed);

//Get Routes
router.route("/GetAllNewsFeed").get(NewsFeedController.getAllNewsfeed);
router
  .route("/GetSingleNewsFeed/:id")
  .get(NewsFeedController.getSingleNewsfeed);

  router.route("/GetSinglePost/:id").get(NewsFeedController.getSinglePost);

router.route("/GetGroupNewsFeed/:id").get(NewsFeedController.getGroupNewsfeed);

router.route("/GetAllUserPosts/:id").get(NewsFeedController.getAllUserPosts);

router
  .route("/GetAllPostComments/:id")
  .get(CommentController.getAllpostComments);

//Delete Routes
router
  .route("/DeleteNewsFeed/:id")
  .delete(
    NewsFeedController.deleteNewsfeed,
    LikeController.deletepostLikes,
    CommentController.deletepostComments
  );

//Update Routes
router.route("/UpdateNewsFeed/:id").put(NewsFeedController.updateNewsfeed);
module.exports = router;
