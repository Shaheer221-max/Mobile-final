const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  skillname: {
    type: String,
    required: true,
  },
  skillicon: {
    type: String,
    default: 
    "https://res.cloudinary.com/vehiclebuddy/image/upload/v1665413220/rgyax6nangke0c7ssg5c.jpg"
  },
  subskills: [
    {
      type: mongoose.Schema.ObjectId,
      ref:"SkillSubCategory"
    }
    ]

  
    
});
skillSchema.pre(/^find/, function(next) {   // This middleware lets you get user details who posted comment
  this.populate({
    path:"subskills",
    select:"subskillname"
  });
  next();
})


skillSchema.pre('deleteOne',{document: true}, function(next) {
  mongoose.model("SkillSubCategory").deleteMany({'refOfSkill': this._id}, function(err, count) {
    if (err || !count) {
      next(new Error("Could not find subskill"));
    } else {
      next();
    }
  })
})

skillSchema.virtual("SkillSubCategory", {
  ref:"SkillSubCategory",
  foreignField:"refOfSkill",
  localField:"_id"
})

const skill = mongoose.model("Skill", skillSchema); // it will create a collection with event Schema
module.exports = skill;
