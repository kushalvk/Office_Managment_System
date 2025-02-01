const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    dob: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    mobNo: {
        type: String,
        required: true
    },

    qualification: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    workLocation: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['Manager', 'Employee'],
        default: 'Employee'
    },

    profilePhoto: {
        type: String,
        // required: true
    },

    resume: {
        type: String,
        // required: true
    },
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel