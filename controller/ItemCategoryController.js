const factory = require("./handlerFactory");

const ItemCategory = require("../models/ItemCategoryModel");

exports.createItemCategory = factory.createOne(ItemCategory);
exports.updateItemCategory = factory.updateOne(ItemCategory);

exports.deleteItemCategory = factory.deleteOne(ItemCategory);


exports.getAllItemCategories = async (req, res, next) => {
  try {
    const AllItemCategory = await ItemCategory.find().populate([
      { path: "Item" },
    ]);
    res.status(200).json({
      status: "success",
      result: AllItemCategory.length,
      data: AllItemCategory,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};
