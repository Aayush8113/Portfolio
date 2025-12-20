const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create transporter only once logically (Node handles caching internally usually)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Portfolio <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`📧 Email sent: ${info.messageId}`);
};

module.exports = sendEmail;