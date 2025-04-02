const express = require('express');
const {checkInController, checkOutController, getAttendanceController, deletePastAttendanceController,
    getAllAttendanceController
} = require("../controllers/Attendance_Controller");

const router = express.Router();

router.post('/check-in', checkInController);

router.post('/check-out', checkOutController);

router.post('/attendance-data', getAttendanceController);

router.delete('/delete-past-attendances', deletePastAttendanceController);

router.get('/get-daily-attendances', getAllAttendanceController);

module.exports = router