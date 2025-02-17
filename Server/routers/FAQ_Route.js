const express = require('express')
const {addFAQController, fetchAllFaq} = require("../controllers/FAQ_Controller");

const router = express.Router()

router.post('/add-faq', addFAQController);

router.get('/all-faq', fetchAllFaq)

module.exports = router