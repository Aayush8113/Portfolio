const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // 1. Create a "transporter" using credentials from the .env file
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        // IMPROVEMENT: Checking for the specific secure port (465)
        secure: process.env.EMAIL_PORT === '465', 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // 2. Define the email options
    const mailOptions = {
        // IMPROVEMENT: Using process.env.EMAIL_FROM directly if it's already formatted
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    // 3. Send the email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email notification sent: " + info.response);
    } catch (error) {
        // IMPROVEMENT: Log error and re-throw it so the calling function (messageController) can handle it
        console.error("❌ Nodemailer Error:", error.message);
        throw new Error('Email sending failed. Check Nodemailer configuration and credentials.');
    }
};

module.exports = sendEmail;