const express = require('express')
const { addGroupController, allGroupController, fetchGroupByIdController} = require("../controllers/Group_Controller");

const router = express.Router()

router.post('/add-group', addGroupController)

router.get('/all-group', allGroupController)

router.get('/fetch-group-by-id/:id', fetchGroupByIdController)

module.exports = router