const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: {
    type:Date,
    default:Date.now()
  },
  attendance: [
    {
    refOfPlayer: {
      type: mongoose.Schema.ObjectId,
      ref:"User",
      required: true,
    },
    isPresent: {
      type: Boolean,
      default: false
    }
  }

  ],
  isMarked: {
    type: Boolean,
    default:false
  }
 
  
  

  
    
});

const attendance = mongoose.model("Attendance", attendanceSchema); // it will create a collection with event Schema
module.exports = attendance;
