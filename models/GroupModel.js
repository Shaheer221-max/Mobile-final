const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,

    },
    refOfUser: {
      type: mongoose.Schema.ObjectId,
      ref:"User",
      required: [true,"Group must belong to a User"]
    
    },
    Members: [
      {
        type: mongoose.Schema.ObjectId,
        ref:"User"
      }

    ]
    

  },
  {
    toJSON: { virtuals: true }, //it is imp when we are doing referencing
    toObject: { virtuals: true },
  }
);
groupSchema.pre(/^find/, function(next) {   // This middleware lets you get user details who posted it
  this.populate({
    path:"Members",
    select:"name email image isLoggedIn role"
  });
  next();
})

//Virtual populate
groupSchema.virtual("User", {
  ref:"User",
  foreignField:"refOfUser",
  localField:"_id"
})



const group = mongoose.model("Group", groupSchema); // it will create a collection with newsfeedSchema
module.exports = group;