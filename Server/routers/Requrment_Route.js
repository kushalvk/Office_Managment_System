const express = require('express')
const {addRequrmentController, allRequrmentsController, updateRequrmentsController} = require("../controllers/Requrment_Controller");

const router = express.Router()

router.post('/add-requrment', addRequrmentController);

router.get('/all-requrments', allRequrmentsController);

router.post('/update-requrment/:id', updateRequrmentsController);

module.exports = router