const express = require('express')
const { addUserController, loginController, forgotPasswordController, loggedUser, updateProfile, allStaff,
    deleteStaffByIdController, newlyAddedUserController, getUserByIdController
} = require('../controllers/Auth_Controller')
const { default: upload } = require('../middlewares/uploadMiddleware')
const {verifyToken} = require("../middlewares/authMiddleware");

const router = express.Router()

router.post('/add-user', upload.fields([{ name: "profilePhoto", maxCount: 1}, { name: "resume", maxCount: 1}]), addUserController);

router.post('/login', loginController);

router.post('/forgot-password', forgotPasswordController);

router.get('/loggeduser', verifyToken, loggedUser);

router.post('/update-profile/:id', upload.fields([{ name: "profilePhoto", maxCount: 1}, { name: "resume", maxCount: 1}]), updateProfile);

router.get('/all-staff', allStaff);

router.delete('/delete-staff-by-id/:id', deleteStaffByIdController);

router.get('/newly-added-users', newlyAddedUserController);

router.get('/get-user-by-id/:id', getUserByIdController);

module.exports = router