const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    refOfNewsfeed: {
      type: mongoose.Schema.ObjectId,
      ref: "Newsfeed",
      required: [true, "like must belong to a post"],
    },

    refOfUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "like must belong to a User"],
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

likeSchema.pre(/^find/, function (next) {
  // This middleware lets you get user details who liked
  this.populate({
    path: "refOfUser",
    select: "name email image role isLoggedIn",
  });
  next();
});

const like = mongoose.model("Like", likeSchema); // it will create a collection with likeSchema
module.exports = like;
