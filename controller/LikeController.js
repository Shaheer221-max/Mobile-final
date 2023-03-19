const factory = require("./handlerFactory");

const Like = require("../models/LikeModel");
const Newsfeed = require("../models/NewsfeedModel")
const GeneralNotifcation = require("../models/GeneralNotificationModel")

// exports.createLike = factory.createOne(Like);
//Deleting post like if user already liked the post

exports.createLike = async(req,res) => {
  try {
    const doc = await Like.create(req.body);
    const post = await Newsfeed.findOne({_id:req.body.refOfNewsfeed})
    const userId = post.refOfUser
    const notification = await GeneralNotifcation.create({
        refOfUser:userId,
        Content: "You got a Like on one of your posts"
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

exports.deleteLike = async (req, res, next) => {
  try {
    const findLike = await Like.find({
      refOfNewsfeed: req.body.refOfNewsfeed,
      refOfUser: req.body.refOfUser,
    });
    if (findLike.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Not Found",
      });
    } else {
      const doc = await Like.findByIdAndDelete(findLike[0]._id);

      res.status(200).json({
        status: "success",
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deletepostLikes = async (req, res, next) => {
  try {
    const deletedLikes = await Like.deleteMany({
      refOfNewsfeed: req.params.id,
    });
    console.log(deletedLikes);
    next();
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
