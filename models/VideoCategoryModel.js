const mongoose = require("mongoose");

const videocategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true }, //it is imp when we are doing referencing
    toObject: { virtuals: true },
  }
);

videocategorySchema.virtual("Drill", {
  ref: "Drill",
  foreignField: "refOfVideoCat",
  localField: "_id",
});

const videocategory = mongoose.model("VideoCategory", videocategorySchema); // it will create a collection with event Schema
module.exports = videocategory;
