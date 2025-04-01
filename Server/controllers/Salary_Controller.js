const UserModel = require('../models/UserSchema');
const Razorpay = require("razorpay");
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const salaryPaymentController = async (req, res) => {
    try {
        const { amount, id } = req.body;
        console.log(amount, id);
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            payment_capture: 1,
        });

        await UserModel.findByIdAndUpdate(id, {last_payemnt_date: Date.now(), amount: amount, total_days: 0})

        res.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send("Error creating order");
    }
}

module.exports = {salaryPaymentController};