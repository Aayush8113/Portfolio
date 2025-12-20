const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

const createMessage = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    // 1. Validation (Fail Fast)
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message.',
      });
    }

    // 2. Save to Database
    const newMessage = await Message.create({ name, email, phone, message });

    // 3. Send Email Notification (Asynchronous / Non-blocking)
    // We do not await this, so the user gets a fast response.
    // If email fails, we log it on the server, but don't error the user.
    const emailData = {
      subject: `New Portfolio Contact: ${name}`,
      message: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 10px;">${message}</p>
        </div>
      `
    };

    sendEmail(emailData).catch(err => 
        console.error('⚠️ Email Notification Failed:', err.message)
    );

    // 4. Success Response
    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: newMessage,
    });

  } catch (error) {
    // Pass Mongoose validation errors to the global handler
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    next(error);
  }
};

module.exports = { createMessage };