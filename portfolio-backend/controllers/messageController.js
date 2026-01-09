const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

// Helper: Basic Sanitization to prevent XSS
const sanitizeInput = (text) => {
  if (typeof text !== 'string') return '';
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const createMessage = async (req, res, next) => {
  try {
    let { name, email, phone, message } = req.body;

    // 1. Sanitize Inputs
    name = sanitizeInput(name);
    message = sanitizeInput(message);
    phone = sanitizeInput(phone);

    // 2. Manual Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message.',
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // 3. Save to Database
    const newMessage = await Message.create({ 
      name, 
      email, 
      phone, 
      message 
    });

    // 4. Send Email Notification
    try {
        const emailData = {
          // ✅ PASS VISITOR EMAIL HERE
          replyTo: email, 
          
          subject: `New Portfolio Contact: ${name}`,
          message: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h2 style="color: #333; border-bottom: 2px solid #0070f3; padding-bottom: 10px;">New Contact Request</h2>
              <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
              <p style="font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="font-size: 16px;"><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <br />
              <p style="font-size: 16px;"><strong>Message:</strong></p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; color: #555; line-height: 1.6;">
                ${message}
              </div>
              <p style="font-size: 12px; color: #999; margin-top: 20px;">Received via Portfolio Contact Form</p>
            </div>
          `
        };

        // We use await here to ensure we catch email errors if they happen
        await sendEmail(emailData);
        
    } catch (emailError) {
        console.error("Email setup error:", emailError);
        // We log the error but DO NOT fail the request, 
        // because the message IS saved in the database.
    }

    // 5. Success Response
    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: newMessage,
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    next(error);
  }
};

module.exports = { createMessage };