const factory = require("./handlerFactory");

const Newsfeed = require("../models/NewsfeedModel");
const cloudinary = require("../Cloudinary/Cloudinary");
const GeneralNotification = require("../models/GeneralNotificationModel")

exports.updateNewsfeed = factory.updateOne(Newsfeed);
exports.shareNewsfeed = async(req,res) => {
  try {
    const doc = await Newsfeed.create(req.body);
    const notification = await GeneralNotification.create({
      refOfUser:doc.refOfUser,
      Content:`One of your posts have been shared`
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
exports.getSingleNewsfeed = factory.getOne(Newsfeed, [
  { path: "Comment" },
  { path: "Like" },
]);

// To get news feed of all users
exports.getAllNewsfeed = async (req, res, next) => {
  try {
    const AllNewsfeed = await Newsfeed.find({ refOfGroup: null }).populate([
      { path: "Comment" },
      { path: "Like" },
    ]);
    res.status(200).json({
      status: "success",
      result: AllNewsfeed.length,
      data: AllNewsfeed,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

//To get newsfeed of specific group
exports.getGroupNewsfeed = async (req, res, next) => {
  try {
    const AllNewsfeed = await Newsfeed.find({
      refOfGroup: req.params.id,
    }).populate([{ path: "Comment" }, { path: "Like" }]);
    res.status(200).json({
      status: "success",
      result: AllNewsfeed.length,
      data: AllNewsfeed,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

//delete news feed (post) then delete their likes and then comments
exports.deleteNewsfeed = async (req, res, next) => {
  try {
    const newsfeed = await Newsfeed.findByIdAndDelete(req.params.id);
    console.log(newsfeed);
    if (!newsfeed) {
      return res.status(404).json({
        status: "Failed",
        message: "No Post found with that Id",
      });
    }
    next();
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
//get the news feed of the specific user
exports.getAllUserPosts = async (req, res, next) => {
  try {
    const AllNewsfeed = await Newsfeed.find({
      refOfUser: req.params.id,
    }).populate([{ path: "Comment" }, { path: "Like" }]);
    res.status(200).json({
      status: "success",
      result: AllNewsfeed.length,
      data: AllNewsfeed,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Get Single Post
exports.getSinglePost = async (req, res, next) => {
  try {
    const newsfeed = await Newsfeed.findById(req.params.id).populate([
      { path: "Comment" },
      { path: "Like" },
    ]);
    if (!newsfeed) {
      return res.status(404).json({
        status: "Failed",
        message: "No Post found with that Id",
      });
    }
    res.status(200).json({
      status: "success",
      data: newsfeed,
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

//posting newsfeed with video
exports.createNewsfeed = async (req, res, next) => {
  const file = req?.files?.file;


  if (req.files == null) {
    try {
      const newsfeed = new Newsfeed({
        status: req.body.status,
        refOfUser: req.body.refOfUser,
        image: req.body.image,
        refOfGroup: req.body.refOfGroup,
      });

      newsfeed.save().then(
        res.status(200).json({
          msg: "psot",
          data: newsfeed,
        })
      );
    } catch (err) {
      return res.status(404).json({
        status: "Failed",
        message: err.message,
      });
    }
  } else {
    try {
      const result = await cloudinary.uploader
        .upload(file.tempFilePath, {
          resource_type: "auto",
          upload_preset: "CPC_database",
        })
        .catch((err) => console.log("error", JSON.stringify(err, null, 2)));

      const newsfeed = new Newsfeed({
        status: req.body.status,
        video: result.secure_url,
        refOfUser: req.body.refOfUser,
        refOfGroup: req.body.refOfGroup,
      });

      newsfeed.save().then(
        res.status(200).json({
          msg: "psot",
          data: newsfeed,
        })
      );
    } catch (err) {
      return res.status(404).json({
        status: "Failed",
        message: err.message,
      });
    }
  }
};


