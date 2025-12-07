const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Blueprint for a single contact message
const messageSchema = new Schema(
    {
        // Sender's name
        name: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
        },
        // Sender's email
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            lowercase: true, // Converts email to lowercase
            trim: true,
            // Regex for basic email validation
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },
        // --- ADDED PHONE FIELD ---
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            // Basic regex: 10-15 chars, can include +, -, (), spaces.
            match: [/^[+\d()-\s]{10,15}$/, 'Please enter a valid phone number (10-15 digits)'],
        },
        // --- END OF ADDITION ---
        
        // Sender's message
        message: {
            type: String,
            required: [true, 'Please provide a message'],
        },
    },
    {
        timestamps: true, // Adds 'createdAt' and 'updatedAt' fields
    }
);

module.exports = mongoose.model('Message', messageSchema);