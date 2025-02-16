const express = require('express')
const {addNotificationController, fetchAllNotifications, deleteNotificationById} = require("../controllers/Notification_Controller");

const router = express.Router()

router.post('/add-notification', addNotificationController);

router.get('/fetch-all-notification', fetchAllNotifications);

router.delete('/delete-notification-by-id/:id', deleteNotificationById);

module.exports = router