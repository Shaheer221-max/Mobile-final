const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  refOfUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Reply must belong to a User"],
  },
  text: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const commentSchema = new mongoose.Schema(
  {
    refOfNewsfeed: {
      type: mongoose.Schema.ObjectId,
      ref: "Newsfeed",
      required: [true, "Comment must belong to a post"],
    },
    refOfUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment must belong to a User"],
    },
    comment: {
      type: String,
      required: [true, "Comment can not be empty"],
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    replies:[replySchema]
  },
  {
    toJSON: { virtuals: true }, //it is imp when we are doing referencing
    toObject: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function (next) {
  // This middleware lets you get user details who posted comment
  this.populate({
    path: "refOfUser",
    select: "name email image role isLoggedIn",
  })
  .populate({
    path: "replies.refOfUser",
    select: "name email image role isLoggedIn",
    
  });
  next();
});

// replySchema.pre(/^find/, function (next) {
//   // This middleware lets you get user details who posted comment
//   this.populate({
//     path: "replies",
//     populate: {
//       path:"refOfUser",
//       select: "name email image role isLoggedIn"
//     }
    
//   });
//   next();
// });



const comment = mongoose.model("Comment", commentSchema); // it will create a collection with commentSchema
module.exports = comment;
