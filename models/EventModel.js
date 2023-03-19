const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String,
    },
    date: {
        type:Date, 
        required:true
    },
    isHistory: {
        type:Boolean,
        default:false
    },
    offDay: {
        type:Boolean,
        default:false
    }


}) 

const event = mongoose.model("Event", eventSchema); // it will create a collection with event Schema
module.exports = event;