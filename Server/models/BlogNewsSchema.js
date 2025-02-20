const mongoose = require("mongoose");

const BlogNewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
    }
},{timestamps: true});

const BlogNewsModel = mongoose.model('blogNews', BlogNewsSchema)
module.exports = BlogNewsModel