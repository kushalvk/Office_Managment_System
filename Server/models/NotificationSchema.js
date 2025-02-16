const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: true,
    }
},{timestamps:true});

const NotificationModel = mongoose.model('notifications', NotificationSchema)
module.exports = NotificationModel