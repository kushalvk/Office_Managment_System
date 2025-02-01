const express = require('express')
const { addUser } = require('../controllers/Auth_Controller')

const router = express.Router()

router.post('/add-user', addUser)

module.exports = router