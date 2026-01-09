const mongoose = require('mongoose');

// Standard Regex for Email Validation
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true, // Auto-removes whitespace from both ends
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  email: {
    type: String,
    match: [emailRegex, 'Please add a valid email'],
    required: [true, 'Please add an email'],
    lowercase: true, // Store emails in lowercase to avoid case-sensitive dupes
    trim: true
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
    maxlength: [2000, 'Message cannot be more than 2000 characters'], // Increased slightly for detailed inquiries
    trim: true
  }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

module.exports = mongoose.model('Message', messageSchema);