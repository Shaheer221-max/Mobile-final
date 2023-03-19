const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const notification = require("./../models/AdminNotification");
const User = require("./../models/UserModel");
const factory = require("./handlerFactory");

exports.AddNotification = async (req, res, next) => {
  const token = req.token;
  const user = req.CreatedUser;
  const cookieOptions = req.cookie;
  

  //Agr Customer hova to vo direct login kar jay ga agr shop owner hova to usa permission ki zroorat ha
  try {
    if (user.role === "Player") {

      const Notification = await notification.create({
        refOfUser: req.CreatedUser._id,
      });
      console.log(Notification);
      res.status(201).json({
        status: "success",

        data: {
          user,
        },
      });

      // ***********************************************************************
      // res.cookie("jwt", token, cookieOptions);
      // res.status(201).json({
      //   status: "success",
      //   token,
      //   data: {
      //     user,
      //   },
      // });
    } else {

      res.cookie("jwt", token, cookieOptions);
      res.status(201).json({
        status: "success",
        token,
        data: {
          user,
        },
      });

      //****************************************************************** */
      // const Notification = await notification.create({
      //   refOfUser: req.CreatedUser._id,
      // });
      // console.log(Notification);
      // res.status(201).json({
      //   status: "success",

      //   data: {
      //     user,
      //   },
      // });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Error in generating token",
    });
  }
};

exports.getNotification = async (req, res, next) => {
  try {
    const allNotifications = await notification.find();
    var notificationarray = [];
    var j = 0;
    for (i = 0; i < allNotifications.length; i++) {
      const notification = await User.findById(allNotifications[i].refOfUser);
      if (notification) {
        notificationarray[j] = allNotifications[i];
        j++;
      }
    }
    console.log(notificationarray);

    res.status(200).json({
      result: notificationarray.length,
      status: "Success",
      data: {
        notificationarray,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Error in generating token",
    });
  }
};

exports.deleteNotification = factory.deleteOne(notification);
