const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
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
        required: true,
        unique: true
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
        required: true
    },

    sallary_per_day: {
        type: Number,
        required: true,
    },

    total_days: {
        type: Number,
        default: 0
    },

    last_payemnt_date: {
        type: Date,
    },

    amount: {
        type: Number,
    }
},{timestamps:true})

UserSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({
            username: this.username,
            email: this.email,
            role: this.role,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            });
        return token;
    } catch (error) {
        console.log(error)
    }
}

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel