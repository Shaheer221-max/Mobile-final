var express = require("express");
var router = express.Router();

const ItemController = require("../controller/ItemController");

//Get Routes
router.route("/GetAllItems").get(ItemController.getAllItems);

router.route("/GetCategoryItems/:id").get(ItemController.getCategoryItems);

//Post Routes
router.route("/CreateItem").post(ItemController.createItem);

router.route("/PayPayment").post(ItemController.PayPayment);

//Put Routes
router.route("/UpdateItem/:id").put(ItemController.updateItem);

//Delete Routes
router.route("/DeleteItem/:id").delete(ItemController.deleteItem);

module.exports = router;
