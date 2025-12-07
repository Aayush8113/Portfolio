const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail.js'); 

const createMessage = async (req, res) => {
    try {
        // --- 1. ADDED 'phone' TO DESTRUCTURING ---
        const { name, email, phone, message } = req.body;

        // --- 2. ADDED 'phone' TO VALIDATION ---
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ 
                success: false, 
                // --- 2.1 UPDATED ERROR MESSAGE ---
                message: 'Please provide your name, email, phone number, and a message.' 
            });
        }
        
        // --- 3. ADDED 'phone' TO DATABASE OBJECT ---
        const newMessage = new Message({ name, email, phone, message });
        const savedMessage = await newMessage.save();
        console.log('Database: Message saved successfully.');

        // --- 4. ADDED 'phone' TO EMAIL LOGIC ---
        try {
            const emailSubject = `New Portfolio Contact from ${name}`;
            
            await sendEmail({
                subject: emailSubject,
                // --- 4.1 Plain text version ---
                message: `From: ${name} (${email})\nPhone: ${phone}\n\nMessage:\n${message}`, 
                // --- 4.2 HTML version ---
                html: `<h1>New Message from your Portfolio</h1>
                       <p><strong>From:</strong> ${name} (${email})</p>
                       <p><strong>Phone:</strong> ${phone}</p>
                       <p><strong>Message:</strong></p>
                       <p style="white-space: pre-wrap;">${message}</p>`,
            });
            
        } catch (emailError) {
            console.error('⚠️ Warning: Email failed to send but message was saved.', emailError.message);
        }

        // --- 5. Success Response (No change needed) ---
        res.status(201).json({ 
            success: true, 
            message: 'Message received! I will get back to you soon.',
            data: savedMessage 
        });

    } catch (error) {
        console.error('Error in messageController:', error.message); 
        
        // --- 6. IMPROVED ERROR HANDLING (Catches Mongoose Validation) ---
        if (error.name === 'ValidationError') {
            // Extracts the specific error messages from the model
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(' ') // e.g., "Phone number is required"
            });
        }
        
        // Fallback for other server errors
        res.status(500).json({ 
            success: false, 
            message: 'Server error: Failed to process message.',
        });
    }
};

module.exports = {
    createMessage,
};