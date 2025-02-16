const express = require('express')
const { addGroupController, allGroupController, fetchGroupByIdController, deleteGroupById} = require("../controllers/Group_Controller");

const router = express.Router()

router.post('/add-group', addGroupController)

router.get('/all-group', allGroupController)

router.get('/fetch-group-by-id/:id', fetchGroupByIdController)

router.delete('/delete-groups-by-id/:id', deleteGroupById)

module.exports = router