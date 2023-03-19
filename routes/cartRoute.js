var express = require("express");
var router = express.Router();
const cartController = require("../controller/cartController");
// Add to cart

router.route("/addToCart").post(cartController.addTocart);
router.route("/getUserCartProduct/:id").get(cartController.getUserCartProduct);
router.route("/updateCart/:id").patch(cartController.updateCart);
router.route("/deleteCartProduct/:id").delete(cartController.deleteCartProduct);

module.exports = router;
