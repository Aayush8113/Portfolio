// --- 1. IMPORT DEPENDENCIES ---
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 

// --- 2. INITIALIZE EXPRESS APP ---
const app = express();

// --- 3. SET UP PORT ---
const PORT = process.env.PORT || 5000;

// --- 4. CONNECT TO DATABASE ---
connectDB();

// --- 5. APPLY MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- 6. DEFINE A TEST ROUTE ---
app.get('/', (req, res) => {
    res.send('Portfolio API is running...');
});

// --- 7. DEFINE API ROUTES ---
// Import and use the project routes
const projectRoutes = require('./routes/api/projects');
app.use('/api/projects', projectRoutes);

// --- NEW ROUTES ADDED HERE ---
// 1. Import and use the testimonial routes
const testimonialRoutes = require('./routes/api/testimonials'); 
app.use('/api/testimonials', testimonialRoutes); 

// 2. Import and use the contact/message routes
const contactRoutes = require('./routes/api/contact.js'); 
// *** FIX APPLIED HERE: Changed base path to /api/messages ***
app.use('/api/messages', contactRoutes); // <-- Maps to the /api/messages endpoint


// --- 8. START THE SERVER ---
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});