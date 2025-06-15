const AttendanceModel = require("../models/Attendance");
const UserModel = require('../models/UserSchema');

const checkInController = async (req, res) => {
    try {
        const { username } = req.body;
        const date = new Date().toISOString().split('T')[0];

        const now = new Date();
        // const currentHour = now.getHours();
        // const currentMinute = now.getMinutes();

        // Convert to IST
        // const istOffset = 5.5 * 60; // 330 minutes
        // const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        // const istTime = new Date(utc + 60000 * istOffset);
        //
        // const currentHour = istTime.getHours();
        // const currentMinute = istTime.getMinutes();
        //
        // if (currentHour < 8 || (currentHour === 9 && currentMinute > 0)) {
        //     return res.status(400).json({ message: "Check-in allowed only between 8:00 AM and 9:00 AM IST." });
        // }

        AttendanceModel.create({ username, date, check_in: now, at_status: 'Present' })
            .then((attendance) => res.status(200).json({ message: "You have Checked In Successfully", attendance }))
            .catch((err) => res.status(500).json({ message: "Error To Check In", err }));
    } catch (e) {
        res.status(500).json({ message: "Something Went Wrong", e });
    }
};

const checkOutController = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const now = new Date();
        // const currentHour = now.getHours();
        //
        // if (currentHour < 18 || currentHour >= 19) {
        //     return res.status(403).json({ message: "Check-out allowed only between 6:00 PM and 7:00 PM." });
        // }

        // Get current time and convert to IST
        // const now = new Date();
        // const istOffset = 5.5 * 60; // IST is UTC+5:30
        // const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        // const istTime = new Date(utc + 60000 * istOffset);
        //
        // const currentHour = istTime.getHours();
        // const currentMinute = istTime.getMinutes();
        //
        // if (currentHour < 18 || (currentHour === 19 && currentMinute > 0) || currentHour >= 19) {
        //     return res.status(403).json({ message: "Check-out allowed only between 6:00 PM and 7:00 PM IST." });
        // }

        const date = now.toISOString().split('T')[0];
        const attendance = await AttendanceModel.findOneAndUpdate(
            { username, date },
            { check_out: now },
            { upsert: true, new: true }
        );

        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { username },
            { total_days: (user.total_days || 0) + 1 },
            { new: true }
        );

        return res.status(200).json({
            message: "You have checked out successfully",
            attendance,
            user: updatedUser
        });

    } catch (error) {
        console.error("Error in checkOutController:", error);
        return res.status(500).json({
            message: "Internal server error during checkout",
            error: error.message
        });
    }
};

const getAttendanceController = async (req, res) => {
    try {
        const {username} = req.body;
        const date = new Date().toISOString().split('T')[0];

        AttendanceModel.findOne({username, date})
            .then((attendance) => res.status(200).json(attendance))
            .catch((err) => res.status(500).json({message: "Error To fetch attendance", err}));
    } catch (e) {
        res.status(500).json({message: "Something Wrong", e});
    }
}

const getAllAttendanceController = async (req, res) => {
    try {
        AttendanceModel.find()
            .then((attendance) => res.status(200).json(attendance))
            .catch((err) => res.status(500).json({message: "Error To fetch attendance", err}));
    } catch (e) {
        res.status(500).json({message: "Something Wrong", e});
    }
}

const deletePastAttendanceController = async (req, res) => {
    try {
        const date = new Date();

        if (!date) {
            return res.status(400).json({ message: "Date is required" });
        }

        const providedDate = new Date(date);
        if (isNaN(providedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const cutoffDate = new Date(providedDate);
        cutoffDate.setHours(0, 0, 0, 0);

        const result = await AttendanceModel.deleteMany({
            date: { $lt: cutoffDate },
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: `No attendance records found before ${cutoffDate.toISOString().split('T')[0]}`
            });
        }

        return res.status(200).json({
            message: `Successfully deleted ${result.deletedCount} attendance records before ${cutoffDate.toISOString().split('T')[0]}`,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error("Error deleting past attendance:", error);
        return res.status(500).json({
            message: "Failed to delete past attendance records",
            error: error.message,
        });
    }
};

module.exports = {checkInController, checkOutController, getAttendanceController, deletePastAttendanceController, getAllAttendanceController};