const express = require('express')
const {
    addReportController, allReportController, approveReportController, deleteReportController,
    newlyAddedReportsController, pendingApprovalController
} = require("../controllers/Report_Controller");
const {default: upload} = require("../middlewares/uploadMiddleware");

const router = express.Router()

router.post('/add-report', upload.single("reportdocument"), addReportController)

router.get('/all-reports', allReportController)

router.post('/approve-reports/:id', approveReportController)

router.delete('/delete-reports/:id', deleteReportController)

router.get('/newly-reports', newlyAddedReportsController)

router.get('/pending-approval-reports', pendingApprovalController)

module.exports = router