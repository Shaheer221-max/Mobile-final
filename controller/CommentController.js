const factory = require("./handlerFactory");

const Comment = require("../models/CommentModel")
const Newsfeed = require("../models/NewsfeedModel")
const GeneralNotifcation = require("../models/GeneralNotificationModel")


// exports.createComment = factory.createOne(Comment)
exports.updateComment = factory.updateOne(Comment)
exports.deleteComment = factory.deleteOne(Comment)


exports.createComment = async(req,res) => {
  try {
    const doc = await Comment.create(req.body);
    const post = await Newsfeed.findOne({_id:req.body.refOfNewsfeed})
    const userId = post.refOfUser
    const notification = await GeneralNotifcation.create({
        refOfUser:userId,
        Content: "You got a comment on one of your posts"
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
exports.getAllpostComments = async(req,res, next) => {
  try {
      const AllComments = await Comment.find({refOfNewsfeed: req.params.id})
      res.status(200).json({
          status:"success",
          result:AllComments.length,
          data: AllComments
      })

  }
  catch (err) {
      return res.status(404).json({
          status:"Failed",
          message: err.message
      })

  }
}

exports.deletepostComments = async(req, res, next) => {
    try {
      const deletedComments = await Comment.deleteMany({
        refOfNewsfeed: req.params.id,
      });
      console.log(deletedComments);
      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      return res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.addReplyToComment = async(req,res) => {
    try {
      const comment = await Comment.findById(req.params.C_id);
      comment.replies.push({
        refOfUser:req.body.refOfUser,
        text:req.body.text})

      await comment.save()
      res.status(200).json({
        status: "success",
        data:comment
      });

    }
    catch(err) {
      return res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  }