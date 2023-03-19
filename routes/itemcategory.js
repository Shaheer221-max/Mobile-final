var express = require("express");
var router = express.Router();

const ItemCategoryController = require("../controller/ItemCategoryController");

//Get Routes
router
  .route("/GetAllItemCategories")
  .get(ItemCategoryController.getAllItemCategories);

//Post Routes

router
  .route("/CreateItemCategory")
  .post(ItemCategoryController.createItemCategory);

//Update Routes
router
  .route("/UpdateItemCategory/:id")
  .put(ItemCategoryController.updateItemCategory);
//Delete Routes
router
  .route("/DeleteItemCategory/:id")
  .delete(ItemCategoryController.deleteItemCategory);


module.exports = router;
