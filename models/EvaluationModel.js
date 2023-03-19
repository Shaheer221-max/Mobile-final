const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  date: {
    type:Date,
    default:Date.now()
  },
  refOfPlayer: {
    type:mongoose.Schema.ObjectId,
    ref:"User"
  },
  refOfSkill: {
    type:mongoose.Schema.ObjectId,
    ref:"Skill"
  },
  scores:[

    {
      refOfSubSkill:{
        type:mongoose.Schema.ObjectId,
        ref:"SkillSubCategory"
        },
      score: {
        type:Number,
        default:0
      }
    }
  ],
  avgScore: {
    type:Number,
    default: 0

  },
  isMarked: {
    type: Boolean,
    default:false
  }
  
 
  
  

  
    
});

evaluationSchema.pre(/^find/, function (next) {
  // This middleware lets you get user details who posted comment
  this.populate({
    path: "refOfSkill",
    select: "skillname",
  })
  .populate(
    {
     path: "scores.refOfSubSkill",
     select: "subskillname"
      
    }
  );

  next();
});

evaluationSchema.pre(/^find/, function (next) {
  // This middleware lets you get user details who posted comment
  this.populate({
    path: "refOfPlayer",
    select: "name email age position image dateOfBirth",
  })
  .populate();

  next();
});

const evaluation = mongoose.model("Evaluation", evaluationSchema); // it will create a collection with event Schema
module.exports = evaluation;
