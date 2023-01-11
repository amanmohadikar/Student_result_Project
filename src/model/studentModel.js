const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    subject : {
        type : String,
        trim : true,
        required : true
    },
    marks : {
        type : Number,
        trim : true,
        required : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

module.exports = mongoose.model("student", studentSchema)