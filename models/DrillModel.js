const mongoose = require("mongoose");

const drillSchema = new mongoose.Schema(
  {
    drilltitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    video: {
      type: String,
      required: true,
    },
    refOfVideoCat: {
      type: mongoose.Schema.ObjectId,
      ref: "VideoCategory",
      required: true,
    },
    refOfUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Drill must belong to a User(Coach)"],
    },
  },
  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true }, //it is imp when we are doing referencing
    toObject: { virtuals: true },
  }
);

drillSchema.pre(/^find/, function (next) {
  // This middleware lets you get user details who posted comment
  this.populate({
    path: "refOfUser",
    select: "name email image role isLoggedIn",
  });

  this.populate({
    path: "refOfVideoCat",
    select: "title",
  });
  next();
});

const drill = mongoose.model("Drill", drillSchema); // it will create a collection with event Schema
module.exports = drill;
