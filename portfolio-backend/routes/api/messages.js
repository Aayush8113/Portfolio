const mongoose = require('mongoose');

// Define the schema (structure) for a contact message
const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        // Simple regex check for email format validation
        match: [/.+@.+\..+/, 'Please enter a valid email address'], 
        lowercase: true,
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Message content is required'],
        maxlength: 5000 
    },
    // Timestamp for when the message was received
    dateReceived: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Mongoose Model
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;