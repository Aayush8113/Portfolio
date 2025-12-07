const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Blueprint for a single testimonial
const testimonialSchema = new Schema(
  {
    // Name of the person giving the testimonial
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra whitespace
    },
    // Their quote
    quote: {
      type: String,
      required: true,
    },
    // Their company or title (e.g., "CEO at Google")
    company: {
      type: String,
      required: false, // This field is optional
    },
  },
  {
    timestamps: true, // Adds 'createdAt' and 'updatedAt'
  }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);