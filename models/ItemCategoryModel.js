const mongoose = require("mongoose");

const itemcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true }, //it is imp when we are doing referencing
    toObject: { virtuals: true },
  }
);

itemcategorySchema.virtual("Item", {
  ref: "Item",
  foreignField: "refOfCategory",
  localField: "_id",
});

const itemcategory = mongoose.model("ItemCategory", itemcategorySchema); // it will create a collection with event Schema
module.exports = itemcategory;
