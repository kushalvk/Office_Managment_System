const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    occupation: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    contact: {
        type: Number,
        required: true,
    },
},{timestamps:true});

const SalaryModel = mongoose.model('salarys', SalarySchema)
module.exports = SalaryModel