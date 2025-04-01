const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    check_in: {
        type: Date,
    },
    check_out: {
        type: Date,
    },
    at_status: {
        type: String,
        enum: ['Present', 'Absent'],
    }
},{timestamps: true});

const AttendanceModel = mongoose.model('attendance', AttendanceSchema)
module.exports = AttendanceModel