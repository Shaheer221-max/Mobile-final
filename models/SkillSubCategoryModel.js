const mongoose = require("mongoose");

const skillsubcategorySchema = new mongoose.Schema({
  subskillname: {
    type: String,
    required: true,
  },
  refOfSkill: {
    type: mongoose.Schema.ObjectId,
    ref:"Skill"
  }
  

  
    
});

const skillsubcategory = mongoose.model("SkillSubCategory", skillsubcategorySchema); // it will create a collection with event Schema
module.exports = skillsubcategory;
