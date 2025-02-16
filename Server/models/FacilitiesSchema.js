const mongoose = require("mongoose");

const FacilitiesSchema = new mongoose.Schema({
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
});

const FacilitiesModel = mongoose.model('facilities', FacilitiesSchema)
module.exports = FacilitiesModel