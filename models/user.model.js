const mongoose = require("mongoose");
var validator = require('validator');
const userRole = require("../utils/user-roles");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, 'filed must be a valid email']
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: [userRole.USER, userRole.ADMIN, userRole.MANGER],
        default: userRole.USER
    },
    avatar:{
        type: String,
        default: "uploads/profile.png"
    }
})

module.exports = mongoose.model("User", userSchema); 
