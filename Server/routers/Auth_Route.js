const express = require('express')
const { addUser } = require('../controllers/Auth_Controller')
const { default: upload } = require('../middlewares/uploadMiddleware')

const router = express.Router()

router.post('/add-user', upload.fields([{ name: "profilePhoto", maxCount: 1}, { name: "resume", maxCount: 1}]), addUser);

module.exports = router