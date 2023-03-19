const CustomerBuyingNotification = require("./../models/CustomerBuyingNotification");
const factory = require("./handlerFactory");

exports.postNotification = factory.createOne(CustomerBuyingNotification);

exports.updateNotification = factory.updateOne(CustomerBuyingNotification);

exports.deleteNotification = factory.deleteOne(CustomerBuyingNotification);
exports.getNotification = async (req, res, next) => {
  try {
    const Notification = await CustomerBuyingNotification.find({
      refOfCustomer: req.params.id,
    });
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

// .populate({ path: "Product", path: "User" });
