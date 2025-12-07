const express = require('express');
const router = express.Router();
const testimonialController = require('../../controllers/testimonialController');

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/', testimonialController.getAllTestimonials);

module.exports = router;