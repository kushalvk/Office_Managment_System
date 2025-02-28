const ReportsModel = require("../models/ReportSchema");
const {uploadOnCloudinary} = require("../cloudinary/Cloudinary");

const addReportController = async (req, res) => {
    try {
        const {title, description, startDate, endDate, submitedBy} = req.body;

        const reportDocumentLocalPath = req?.file?.buffer;
        const reportDocument = await uploadOnCloudinary(reportDocumentLocalPath);

        ReportsModel.create({title, description, reportDocument: reportDocument.url, startDate, endDate, submitedBy})
            .then(() => res.status(200).send({message: "Report Added successfully"}))
            .catch((err) => res.status(500).send({message: "Fail to Add Report : Controller ", err}));
    } catch (error) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(413).send({message: "File size exceeds 10MB limit"});
        } else {
            res.status(500).send({message: "Error to add Report : Controller ", error});
        }
    }
}

const allReportControllerByUsername = async (req, res) => {
    try {
        const {username} = req.params;

        ReportsModel.find({submitedBy: username})
            .then((reports) => res.status(200).send({reports}))
            .catch((err) => res.status(500).send({message: "Fail to fetch Reports : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to fetch Report : Controller ", error});
    }
}

const allReportController = async (req, res) => {
    try {
        ReportsModel.find()
            .then((reports) => res.status(200).send({reports}))
            .catch((err) => res.status(500).send({message: "Fail to fetch Reports : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to fetch Report : Controller ", error});
    }
}

const approveReportController = async (req, res) => {
    try {
        const {id} = req.params;

        ReportsModel.findByIdAndUpdate(id, {approve: true})
            .then(() => res.status(200).send({message: "Report Approved successfully "}))
            .catch((err) => res.status(500).send({message: "Fail to Approve Reports : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to Approve Report : Controller ", error});
    }
}

const deleteReportController = async (req, res) => {
    try {
        const {id} = req.params;

        ReportsModel.findByIdAndDelete(id)
            .then(() => res.status(200).send({message: "Report Deleted successfully "}))
            .catch((err) => res.status(500).send({message: "Fail to Delete Reports : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to Delete Report : Controller ", error});
    }
}

const newlyAddedReportsController = async (req, res) => {
    try {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

        ReportsModel.find({createdAt: {$gte: twentyFourHoursAgo}})
            .then((reports) => res.status(200).send(reports))
            .catch((err) => res.status(500).send({message: "Fail to fetch newly reports : Controller ", err}));
    } catch (error) {
        res.status(500).send({message: "Error to fetch newly report : Controller ", error});
    }
}

const pendingApprovalController = async (req, res) => {
    try {
        ReportsModel.find({approve: false})
            .then((reports) => res.status(200).send(reports))
            .catch((err) => res.status(500).send({
                message: "Fail to fetch pending approval reports : Controller ",
                err
            }));
    } catch (error) {
        res.status(500).send({message: "Error to fetch pending approval report : Controller ", error});
    }
}

module.exports = {
    addReportController,
    allReportController,
    approveReportController,
    deleteReportController,
    newlyAddedReportsController,
    pendingApprovalController,
    allReportControllerByUsername
}