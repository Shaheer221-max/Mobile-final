const mongoose = require("mongoose");


const folderSchema = new mongoose.Schema({
    foldername: {
      type:String,
      required:true
    },
    Files: [
      {
      filename:{
        type:String,
        required:true
      },
      url:
        {
          type: String
        }
      }
      ]

}) 

const folder = mongoose.model("Folder", folderSchema); // it will create a collection with event Schema
module.exports = folder;