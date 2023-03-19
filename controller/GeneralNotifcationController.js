const factory = require("./handlerFactory");

const general_notification = require("../models/GeneralNotificationModel")
const User = require("../models/UserModel")

exports.deleteGeneralNotification = factory.deleteOne(general_notification)



exports.getGeneralNotificationsofUser = async (req, res, next) => {
    try {
      const allNotifications = await general_notification.find({refOfUser:req.params.id});
      
  
      res.status(200).json({
        result: allNotifications.length,
        status: "Success",
        data: allNotifications,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: "Error in generating token",
      });
    }
  };

  exports.getGeneralNotificationsofAllCoaches = async (req, res, next) => {
    try {
      const allNotifications = await general_notification.find({for:"Coach"});
      
  
      res.status(200).json({
        result: allNotifications.length,
        status: "Success",
        data: allNotifications,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: "Error in generating token",
      });
    }
  };

  exports.getGeneralNotificationsofAllPlayers = async (req, res, next) => {
    try {
      const allNotifications = await general_notification.find({for:"Player"});
      
  
      res.status(200).json({
        result: allNotifications.length,
        status: "Success",
        data: allNotifications,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: "Error in generating token",
      });
    }
  };