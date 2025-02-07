const mongoose = require("mongoose");

const RequrmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    reason: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },

    requrmentStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Cancelled'],
        default: 'Pending',
    }
})

const RequrmentsModel = mongoose.model('requrments', RequrmentSchema)
module.exports = RequrmentsModel