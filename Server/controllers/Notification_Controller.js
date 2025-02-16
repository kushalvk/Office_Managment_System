const NotificationModel = require("../models/NotificationSchema");

const addNotificationController = async (req, res) => {
    try {
        const form = req.body;

        await NotificationModel.create({ ...form })
            .then(() => res.status(200).send({ message: "Group Added successfully" }))
            .catch(err => res.status(500).send({ message: "Fail to Add Group : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Add Group : Controller ", error })
    }
}

const fetchAllNotifications = async (req, res) => {
    try {
        await NotificationModel.find()
            .then((notifications) => res.status(200).send( notifications ))
            .catch(err => res.status(500).send({ message: "Fail to Fetch Group : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Fetch Group : Controller ", error })
    }
}

const deleteNotificationById = async (req, res) => {
    try {
        const {id} = req.params;

        await NotificationModel.findByIdAndDelete(id)
            .then(() => res.status(200).send({ message: "Deleted Successfully" }))
            .catch(err => res.status(500).send({ message: "Fail to Delete Notification : Controller ", err}));
    } catch (error) {
        res.status(500).send({ message: "Error to Delete Notification : Controller ", error })
    }
}

module.exports = { addNotificationController, fetchAllNotifications, deleteNotificationById }