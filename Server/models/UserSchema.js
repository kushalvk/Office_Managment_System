const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

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
        required: true,
    },

    role: {
        type: String,
        required: true,
        enum: ['employee', 'manager'],
        default: 'employee'
    },

    profilePhoto: {
        type: String,
        // required: true,
    },

    resume: {
        type: String,
        // required: true,
    },

},{timestamps: true})

// UserSchema.methods.generateAuthToken = async function () {
//     try {
//         const token = jwt.sign(
//             {
//                 username: this.username,
//                 email: this.email,
//                 role: this.role,
//             },
//             process.env.JWT_TOKEN,
//             {
//                 expiresIn: '1h'
//             }
//         )
//         return token;
//     } catch (error) {
//         console.log(error);
//     }
// }

const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel