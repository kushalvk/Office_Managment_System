const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Use 587 for TLS
    secure: false, // Use STARTTLS
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD, // Use an App Password if 2FA is enabled
    },
    tls: {
        rejectUnauthorized: false, // Optional: Only for testing, remove in production
    },
});

// Verify transporter setup
transporter.verify((error, success) => {
    if (error) {
        console.error("Transporter verification failed:", error);
    } else {
        console.log("Email Transporter is ready to send emails");
    }
});

async function sendMail(to, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: `"Prime Hub" <${process.env.EMAIL}>`, // Ensure this matches your domain
            to,
            subject,
            text,
            html,
            headers: {
                "X-Entity-Ref-ID": `${Date.now()}-${Math.random().toString(36).substring(2)}`, // Unique ID to avoid spam flagging
            },
        });
        console.log("Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

module.exports = { sendMail };