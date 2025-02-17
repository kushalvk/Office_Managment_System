const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },

    answer: {
        type: String,
        required: true,
    }
});

const FAQModel = mongoose.model('faqs', FAQSchema)
module.exports = FAQModel