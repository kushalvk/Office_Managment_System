const express = require('express')
const { addUserController, loginController } = require('../controllers/Auth_Controller')
const { default: upload } = require('../middlewares/uploadMiddleware')

const router = express.Router()

router.post('/add-user', upload.fields([{ name: "profilePhoto", maxCount: 1}, { name: "resume", maxCount: 1}]), addUserController);

router.post('/login', loginController)

module.exports = router