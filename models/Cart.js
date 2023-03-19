const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: [true, "Product must have quantity"],
    },
    size:{
    type: String,
    },
    color:{
    type: String,
    },
    refOfUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Cart must have reference of Customer"],
    },
    refOfProduct: {
      type: mongoose.Schema.ObjectId,
      ref: "Item",
      required: [true, "Cart must have reference of Product"],
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true }, //it is imp when we are doing referencing
    toObject: { virtuals: true },
  }
);

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "refOfProduct",
  });

  next();
});

const cart = mongoose.model("Cart", cartSchema);

module.exports = cart;
