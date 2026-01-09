const Testimonial = require('../models/Testimonial');

// --- GET ALL TESTIMONIALS (Optimized) ---
const getAllTestimonials = async (req, res, next) => {
  try {
    // 1. Fetch data efficiently
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .lean(); // Converts Mongoose Docs -> Plain JS Objects (Faster)

    // 2. Cache Strategy (5 Minutes)
    // "public" = CDN can cache it
    // "max-age=300" = Browser cache for 300 seconds
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

    res.status(200).json(testimonials);

  } catch (error) {
    next(error); // Pass to global error handler
  }
};

module.exports = {
  getAllTestimonials,
};