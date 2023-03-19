const mongoose = require("mongoose");
const moment = require("moment");

const newsfeedSchema = new mongoose.Schema(
  {
    status: {
      type: String,
    },
    image: {
      type: String,

    },
    video: {
      type: String,

    },
     gif: {
      type:String

    },
    refOfUser: {
      type: mongoose.Schema.ObjectId,
      ref:"User",
      required: [true,"Post must belong to a User"]
    
    },
    refOfGroup: {
      type:String,
      default:null
    },
    time:{
      type:Date,
      default: moment(),
    }
  },
  {
    toJSON: { virtuals: true }, //it is imp when we are doing referencing
    toObject: { virtuals: true },
  }
);
newsfeedSchema.pre(/^find/, function(next) {   // This middleware lets you get user details who posted it
  this.populate({
    path:"refOfUser",
    select:"name email image isLoggedIn role"
  });
  next();
})

//Virtual populate
newsfeedSchema.virtual("Comment", {
  ref:"Comment",
  foreignField:"refOfNewsfeed",
  localField:"_id"
})

newsfeedSchema.virtual("Like", {
  ref:"Like",
  foreignField:"refOfNewsfeed",
  localField:"_id"
})


const newsfeed = mongoose.model("Newsfeed", newsfeedSchema); // it will create a collection with newsfeedSchema
module.exports = newsfeed;
