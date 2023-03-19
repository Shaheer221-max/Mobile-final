const factory = require("./handlerFactory");
const AdminOrderNotification = require("./../models/AdminOrderNotification");

exports.postNotification = factory.createOne(AdminOrderNotification);

exports.deleteNotification = factory.deleteOne(AdminOrderNotification);

exports.getNotification = async (req, res, next) => {
  try {
    const Notification = await AdminOrderNotification.find();
    res.status(200).json({
      status: "success",
      result: Notification.length,
      data: Notification,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
