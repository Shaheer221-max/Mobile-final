const mongoose = require("mongoose");

const AdminNotificationSchema = new mongoose.Schema(
  {
    refOfUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Account Creation must have user Id"],
    },
  },
  { timestamps: true }
);

AdminNotificationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "refOfUser",
  });

  next();
});

const AdminNotification = mongoose.model(
  "AdminNotification",
  AdminNotificationSchema
); // it will create a collection with productSchema
module.exports = AdminNotification;
