import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MessageSquare, Send, Loader2, Check } from 'lucide-react';

// Variant for the success message (Internal animation)
const successVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' } },
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // --- 1. NEW STATE FOR FIELD-SPECIFIC ERRORS ---
  const [errors, setErrors] = useState({});

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  // --- 2. VALIDATION LOGIC ---
  const validate = () => {
    const newErrors = {};

    // Name Validation (Letters and spaces only)
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    // Email Validation (Proper format)
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone Validation (10 digits, starts with 6-9)
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits and start with 6, 7, 8, or 9';
    }

    // Message Validation (Required, min 10 chars)
    if (!formData.message) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    return newErrors;
  };

  // --- 3. UPDATE handleChange ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear the error for this field as the user is typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear any server-side error message
    if (status.error) {
      setStatus(prev => ({ ...prev, error: null }));
    }
  };

  // --- 4. UPDATE handleSubmit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear old errors
    setStatus(prev => ({ ...prev, error: null })); // Clear old server error

    // Run validation
    const validationErrors = validate();

    // If there are errors, set them and stop the submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If validation passes, proceed with submission
    setStatus({ loading: true, success: false, error: null });
    try {
      await axios.post('http://localhost:5000/api/messages', formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '', phone: '' });
      setErrors({}); // Clear errors on success
    } catch (err) {
      // Use the server's error message if available
      const errorMsg = err.response?.data?.message || 'Failed to send message.';
      setStatus({ loading: false, success: false, error: errorMsg });
    }
  };

  // --- 5. UPDATED STYLING LOGIC ---
  // Base input class (removed border colors, will be applied dynamically)
  const inputBaseClass = 
    `w-full p-3 pl-10 rounded-lg bg-gray-800 border 
     text-gray-100 placeholder-gray-500
     focus:bg-gray-900 focus:ring-1 
     transition-colors duration-200`;
  
  // Function to get dynamic input classes
  const getInputClass = (fieldName) => {
    if (errors[fieldName]) {
      return `${inputBaseClass} border-red-500 focus:border-red-500 focus:ring-red-500`;
    }
    return `${inputBaseClass} border-gray-700 focus:border-blue-500 focus:ring-blue-500`;
  };

  // Function to render error messages
  const renderError = (fieldName) => (
    <AnimatePresence>
      {errors[fieldName] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-red-400 text-sm mt-1 ml-1"
        >
          {errors[fieldName]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status.success ? (
          <motion.div
            key="success"
            className="flex flex-col items-center justify-center p-6 md:p-8 text-center"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Check className="w-16 h-16 text-green-500 bg-green-900/50 p-3 rounded-full mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-gray-300 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
            <button
              type="button"
              onClick={() => setStatus({ loading: false, success: false, error: null })}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-4" // space-y-4 is fine, errors will create their own space
            noValidate // Disable native browser validation
          >
            {/* --- 6. UPDATED FIELDS WITH ERROR STYLING --- */}
            
            {/* Name Field */}
            <div>
              <div className="relative">
                <label htmlFor="name" className="sr-only">Name</label>
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  placeholder="Your Name"
                  className={getInputClass('name')}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {renderError('name')}
            </div>

            {/* Email Field */}
            <div>
              <div className="relative">
                <label htmlFor="email" className="sr-only">Email</label>
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  placeholder="Your Email"
                  className={getInputClass('email')}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {renderError('email')}
            </div>

            {/* Phone Field */}
            <div>
              <div className="relative">
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="tel" 
                  name="phone" 
                  id="phone"
                  placeholder="Your Phone Number" // Updated placeholder
                  className={getInputClass('phone')}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              {renderError('phone')}
            </div>

            {/* Message Field */}
            <div>
              <div className="relative">
                <label htmlFor="message" className="sr-only">Message</label>
                <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-500" />
                <textarea 
                  name="message" 
                  id="message"
                  rows="5"
                  placeholder="Your Message (min. 10 characters)"
                  className={`${getInputClass('message')} pt-3`}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              {renderError('message')}
            </div>
            
            {/* Submit Button */}
            <div>
              <button 
                type="submit" 
                disabled={status.loading}
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
                         hover:bg-blue-700 transition-colors 
                         disabled:bg-gray-500 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
              >
                {status.loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {status.loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            
            {/* General Server Error Message */}
            <AnimatePresence>
              {status.error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 text-center text-red-400 bg-red-900/50 rounded-lg"
                >
                  {status.error}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;