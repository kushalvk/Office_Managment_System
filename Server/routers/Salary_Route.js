const express = require('express')
const {addSalaryController, fetchAllSalaryController, deleteSalaryByIdController, salaryPaymentController} = require("../controllers/Salary_Controller");

const router = express.Router()

router.post('/add-employee-salary', addSalaryController);

router.get('/fetch-all-salary', fetchAllSalaryController);

router.delete('/delete-employee-salary-by-id/:id', deleteSalaryByIdController)

router.post('/create-order', salaryPaymentController)

module.exports = router