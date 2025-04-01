const express = require('express')
const {salaryPaymentController} = require("../controllers/Salary_Controller");

const router = express.Router()

router.post('/create-order', salaryPaymentController)

module.exports = router