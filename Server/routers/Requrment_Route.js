const express = require('express')
const {
    addRequrmentController, allRequrmentsController, updateRequrmentsController, updateRequrmentsEmpController,
    allRequrmentsByUsernameController
} = require("../controllers/Requrment_Controller");

const router = express.Router()

router.post('/add-requrment', addRequrmentController);

router.get('/all-requrments', allRequrmentsController);

router.get('/all-requrments-by-username/:username', allRequrmentsByUsernameController);

router.post('/update-requrment/:id', updateRequrmentsController);

router.post('/update-requrment-employee/:id', updateRequrmentsEmpController);

module.exports = router