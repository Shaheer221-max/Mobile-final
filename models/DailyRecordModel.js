const mongoose = require("mongoose");

const dailyRecordSchema = new mongoose.Schema({
    refOfPlayer: {
        type:mongoose.Schema.ObjectId,
        ref:"User"
      },
    date: {
        type:Date
    },
    avgScore: {
        type:Number,
        default: 0
    }
  
});

const dailyrecord = mongoose.model("DailyRecord", dailyRecordSchema); // it will create a collection with event Schema
module.exports = dailyrecord;