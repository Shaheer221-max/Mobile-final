const Cart = require("./../models/Cart");

const factory = require("./handlerFactory");

exports.addTocart = factory.createOne(Cart);

exports.updateCart = factory.updateOne(Cart);

exports.deleteCartProduct = factory.deleteOne(Cart);

exports.getUserCartProduct = async (req, res, next) => {
  try {
    const CustomerCartProducts = await Cart.find({
      refOfUser: req.params.id,
    }).populate({ path: "Item" });
    res.status(200).json({
      status: "success",
      result: CustomerCartProducts.length,
      data: CustomerCartProducts,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
