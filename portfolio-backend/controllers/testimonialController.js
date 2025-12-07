// 1. Import the Testimonial model
const Testimonial = require('../models/Testimonial');

// --- 2. Controller Function: GET all testimonials ---
// This function will be triggered by the route GET /api/testimonials
const getAllTestimonials = async (req, res) => {
  try {
    // 3. Find all testimonials in the database
    // We sort by 'createdAt: -1' to get the newest ones first
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    // 4. Send the testimonials back as a JSON response
    res.json(testimonials);

  } catch (error) {
    // 5. If anything goes wrong, send a server error
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- 6. Export the function ---
module.exports = {
  getAllTestimonials,
};