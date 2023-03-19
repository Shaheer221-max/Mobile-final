const mongoose = require("mongoose");


const clubSchema = new mongoose.Schema({
    Folders: [
        {
          type: mongoose.Schema.ObjectId,
          ref:"Folder"
        }
      ]

}) 

const club = mongoose.model("Club", clubSchema); // it will create a collection with event Schema
module.exports = club;