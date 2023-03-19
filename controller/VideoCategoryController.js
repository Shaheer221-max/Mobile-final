const factory = require("./handlerFactory");

const VideoCategory = require("../models/VideoCategoryModel");

exports.createVideoCategory = factory.createOne(VideoCategory);
exports.updateVideoCategory = factory.updateOne(VideoCategory);
exports.deleteVideoCategory = factory.deleteOne(VideoCategory);
exports.getVideoCategory = factory.getOne(VideoCategory);
exports.getAllVideoCategories = async (req, res, next) => {
  try {
    const AllVideoCategory = await VideoCategory.find().populate([
      { path: "Drill" },
    ]);
    res.status(200).json({
      status: "success",
      result: AllVideoCategory.length,
      data: AllVideoCategory,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};
