const mongoose = require("mongoose");

const AdminOrderNotification = new mongoose.Schema({
  // we will use referincing here to get product

  refOfCustomerNotification: {
    type: mongoose.Schema.ObjectId,
    ref: "CustomerBuyingNotification",
    required: [true, "Order must belong to a CustomerBuyingNotification"],
  },
});

AdminOrderNotification.pre(/^find/, function (next) {
  this.populate({
    path: "refOfCustomerNotification",
  });

  next();
});

const adminOrderNotification = mongoose.model(
  "AdminOrderNotification",
  AdminOrderNotification
);

module.exports = adminOrderNotification;
