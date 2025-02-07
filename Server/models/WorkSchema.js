const mongoose = require("mongoose");

const WorkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    completionDate: {
        type: Date,
        required: true,
    },

    worktype: {
        type: String,
        enum: ['task', 'project'],
        required: true,
    },

    groupName: {
        type: Array,
    },

    empoyeeName: {
        type: Array,
    },

    workStatus: {
        type: String,
        default: 'pending',
        enum: ['pending', 'complete']
    }

},{timestamps:true})

const WorkModel = mongoose.model('works', WorkSchema)
module.exports = WorkModel