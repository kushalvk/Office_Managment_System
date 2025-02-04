const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    members: {
        type: Array,
        required: true
    },

    createdBy: {
        type: String,
        required: true,
    },

    creationDate: {
        type: Date,
        required: true,
    },

    groupType: {
        type: String,
        required: true,
        enum: ['public', 'private'],
    },

    groupStatus: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
    }
},{timestamps:true})

const GroupModel = mongoose.model('groups', GroupSchema)
module.exports = GroupModel