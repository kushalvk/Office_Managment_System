const express = require('express')
const {
    addReportController, allReportController, approveReportController, deleteReportController,
    newlyAddedReportsController, pendingApprovalController
} = require("../controllers/Report_Controller");
const {default: upload} = require("../middlewares/uploadMiddleware");
const cors = require("cors");
require("dotenv").config();

const router = express.Router()

router.post('/add-report', cors({ origin: process.env.FRONT_URL }), (req, res, next) => {
    upload.single("reportdocument")(req, res, (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({ message: "File too large. Maximum allowed size is 10MB." });
            }
            return res.status(500).json({ message: "File upload error", error: err.message });
        }
        next();
    });
}, addReportController);


router.get('/all-reports', allReportController)

router.post('/approve-reports/:id', approveReportController)

router.delete('/delete-reports/:id', deleteReportController)

router.get('/newly-reports', newlyAddedReportsController)

router.get('/pending-approval-reports', pendingApprovalController)

module.exports = router