const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  refOfCategory: {
    type: mongoose.Schema.ObjectId,
    ref: "ItemCategory",
    required: [true, "Product should have a category"],
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  revenue: {
    type: Number,
  },
  sizes: [
    {
      type: String,
      required: true,
    },
  ],
  colors: [
    {
      type: String,
      required: true,
    },
  ],
  coverphoto: {
    type: String,
    default:
      "https://res.cloudinary.com/vehiclebuddy/image/upload/v1665413220/rgyax6nangke0c7ssg5c.jpg",
  },
  productimages: [
    {
      type: String,
      default:
        "https://res.cloudinary.com/vehiclebuddy/image/upload/v1665413220/rgyax6nangke0c7ssg5c.jpg",
    },
  ],
});

const item = mongoose.model("Item", itemSchema); // it will create a collection with event Schema
module.exports = item;
