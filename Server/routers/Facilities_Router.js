const express = require('express')
const { default: upload } = require("../middlewares/uploadMiddleware");
const {addFacilitiesController, fetchAllFacilitiesController} = require("../controllers/Facilities_Controller");

const router = express.Router()

router.post('/add-facilities', upload.single('image'), addFacilitiesController)

router.get('/fetch-all-facilities', fetchAllFacilitiesController)

module.exports = router