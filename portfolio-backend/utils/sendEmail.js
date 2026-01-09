const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. FAIL FAST: Check for critical environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("❌ Fatal Error: Email credentials are missing in .env file.");
  }

  // 2. Create Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: Number(process.env.EMAIL_PORT) === 465, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // 3. Define Email Options
  const mailOptions = {
    // Shows up as "Portfolio Contact <your-email>" in your inbox
    from: `Portfolio Contact <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`, 
    
    // Sends the email TO YOU
    to: process.env.EMAIL_TO,
    
    // ✅ CRITICAL ADDITION: This ensures the "Reply" button works!
    // It tells Gmail: "If Aayush replies, send it to the Visitor's email, not the sender."
    replyTo: options.replyTo, 
    
    subject: options.subject,
    text: options.message, 
    html: options.html,
  };

  // 4. Send Email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Email Send Failed:", error.message);
    throw error; 
  }
};

module.exports = sendEmail;