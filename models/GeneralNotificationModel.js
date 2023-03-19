const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        refOfUser: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
          },
        Content: {
            type:String,
            required:true
        },
        for: {
          type:String
        }
    },
    { timestamps: true }
)

// notificationSchema.pre(/^find/, function (next) {
//     this.populate({
//       path: "refOfUser",
//     });
  
//     next();
//   });

const GeneralNotifcation = mongoose.model(
    "GeneralNotification",
    notificationSchema
  ); // it will create a collection with productSchema
module.exports = GeneralNotifcation;