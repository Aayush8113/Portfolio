// // ContactPage.jsx (or ContactPage.js)

// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaWhatsapp } from 'react-icons/fa'; // From react-icons/fa
// import {
//   Mail,
//   Linkedin,
//   Github,
//   Send,
//   MessageSquareQuote,
//   Rocket,
//   Monitor,
//   Database,
//   Coffee,
//   User,
//   Phone, // Icon is already imported
//   MessageSquare,
//   Loader2,
//   Check
// } from 'lucide-react'; // From lucide-react


// // =================================================================
// // 🚀 1. ContactForm Component (Now with "smart" on-blur validation)
// // =================================================================
// // Variant for the success message (Internal animation)
// const successVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: { opacity: 1, scale: 1, transition: { type: 'spring' } },
// };

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: '',
//   });

//   const [errors, setErrors] = useState({});
//   // --- 1. ADD 'touched' STATE ---
//   // This tracks which fields the user has visited
//   const [touched, setTouched] = useState({});

//   const [status, setStatus] = useState({
//     loading: false,
//     success: false,
//     error: null,
//   });

//   // --- 2. UPDATED VALIDATION LOGIC ---
//   // This now has a 'checkRequired' flag.
//   // By default, it checks for "required".
//   // On blur, we'll set this to 'false' to *only* check for content errors.
//   const validateField = (name, value, checkRequired = true) => {
//     if (checkRequired && !value) {
//       // --- A. Handle "required" errors (only on submit) ---
//       switch (name) {
//         case 'name': return 'Name is required';
//         case 'email': return 'Email is required';
//         case 'phone': return 'Phone number is required';
//         case 'message': return 'Message is required';
//         default: break;
//       }
//     } else if (value) {
//       // --- B. Handle "content" errors (on blur or submit) ---
//       switch (name) {
//         case 'name':
//           if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters and spaces';
//           break;
//         case 'email':
//           if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
//           break;
//         case 'phone':
//           if (!/^[6-9]\d{9}$/.test(value)) return 'Phone must be 10 digits and start with 6, 7, 8, or 9';
//           break;
//         case 'message':
//           if (value.length < 10) return 'Message must be at least 10 characters long';
//           break;
//         default: break;
//       }
//     }
//     return null; // No error
//   };

//   // This function is for the final submit
//   // It validates *everything*, including "required" (checkRequired defaults to true)
//   const validate = () => {
//     const newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       const error = validateField(key, formData[key], true); // 'true' is the default
//       if (error) {
//         newErrors[key] = error;
//       }
//     });
//     return newErrors;
//   };

//   // --- 3. UPDATE handleChange ---
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     // Clear the error for this field as the user is typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//     if (status.error) {
//       setStatus(prev => ({ ...prev, error: null }));
//     }
//   };

//   // --- 4. UPDATE 'handleBlur' ---
//   // This runs when a user clicks *out* of an input field
//   const handleBlur = (e) => {
//     const { name, value } = e.target;

//     // Mark the field as touched
//     setTouched(prev => ({ ...prev, [name]: true }));

//     // Validate the specific field, but DON'T check if it's "required"
//     // We only want to show an error if they typed something *wrong*
//     const error = validateField(name, value, false);

//     setErrors(prev => ({ ...prev, [name]: error }));
//   };

//   // --- 5. UPDATE handleSubmit ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus(prev => ({ ...prev, error: null })); // Clear old server error

//     // Run full validation
//     const validationErrors = validate();

//     // If there are errors, set them and mark all fields as 'touched'
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       setTouched({ name: true, email: true, phone: true, message: true }); // Mark all as touched
//       return;
//     }

//     // If validation passes, proceed with submission
//     setStatus({ loading: true, success: false, error: null });
//     try {
//       await axios.post('http://localhost:5000/api/messages', formData);
//       setStatus({ loading: false, success: true, error: null });
//       setFormData({ name: '', email: '', message: '', phone: '' });
//       setErrors({}); // Clear errors on success
//       setTouched({}); // --- ADDED THIS LINE: Clear touched state on success ---
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || 'Failed to send message.';
//       setStatus({ loading: false, success: false, error: errorMsg });
//     }
//   };

//   // --- 6. STYLING LOGIC ---
//   const inputBaseClass =
//     `w-full p-3 pl-10 rounded-lg bg-gray-800 border 
//        text-gray-100 placeholder-gray-500
//        focus:bg-gray-900 focus:ring-1 
//        transition-colors duration-200`;

//   const getInputClass = (fieldName) => {
//     // Show error only if field is touched AND has an error
//     if (errors[fieldName] && touched[fieldName]) {
//       return `${inputBaseClass} border-red-500 focus:border-red-500 focus:ring-red-500`;
//     }
//     return `${inputBaseClass} border-gray-700 focus:border-blue-500 focus:ring-blue-500`;
//   };

//   // --- 7. UPDATE renderError ---
//   const renderError = (fieldName) => (
//     <AnimatePresence>
//       {/* Show error only if field is touched AND has an error */}
//       {errors[fieldName] && touched[fieldName] && (
//         <motion.p
//           initial={{ opacity: 0, y: -5 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0 }}
//           className="text-red-400 text-sm mt-1 ml-1"
//         >
//           {errors[fieldName]}
//         </motion.p>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <div className="relative">
//       <AnimatePresence mode="wait">
//         {status.success ? (
//           // ... (Success message JSX - no changes) ...
//           <motion.div
//             key="success"
//             className="flex flex-col items-center justify-center p-6 md:p-8 text-center"
//             variants={successVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//           >
//             <Check className="w-16 h-16 text-green-500 bg-green-900/50 p-3 rounded-full mb-4" />
//             <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
//             <p className="text-gray-300 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
//             <button
//               type="button"
//               onClick={() => setStatus({ loading: false, success: false, error: null })}
//               className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
//             >
//               Send Another
//             </button>
//           </motion.div>
//         ) : (
//           // --- 8. UPDATED FORM ---
//           <form
//             key="form"
//             onSubmit={handleSubmit}
//             className="space-y-4"
//             noValidate // Disable native browser validation
//           >
//             {/* Name Field */}
//             <div>
//               <div className="relative">
//                 <label htmlFor="name" className="sr-only">Name</label>
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   placeholder="Your Name"
//                   className={getInputClass('name')}
//                   value={formData.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur} // --- ADDED onBlur ---
//                 />
//               </div>
//               {renderError('name')}
//             </div>

//             {/* Email Field */}
//             <div>
//               <div className="relative">
//                 <label htmlFor="email" className="sr-only">Email</label>
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="Your Email"
//                   className={getInputClass('email')}
//                   value={formData.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur} // --- ADDED onBlur ---
//                 />
//               </div>
//               {renderError('email')}
//             </div>

//             {/* Phone Field */}
//             <div>
//               <div className="relative">
//                 <label htmlFor="phone" className="sr-only">Phone Number</label>
//                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                 <input
//                   type="tel"
//                   name="phone"
//                   id="phone"
//                   placeholder="Your Phone Number"
//                   className={getInputClass('phone')}
//                   value={formData.phone}
//                   onChange={handleChange}
//                   onBlur={handleBlur} // --- ADDED onBlur ---
//                 />
//               </div>
//               {renderError('phone')}
//             </div>

//             {/* Message Field */}
//             <div>
//               <div className="relative">
//                 <label htmlFor="message" className="sr-only">Message</label>
//                 <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-500" />
//                 <textarea
//                   name="message"
//                   id="message"
//                   rows="5"
//                   placeholder="Your Message (min. 10 characters)"
//                   className={`${getInputClass('message')} pt-3`}
//                   value={formData.message}
//                   onChange={handleChange}
//                   onBlur={handleBlur} // --- ADDED onBlur ---
//                 ></textarea>
//               </div>
//               {renderError('message')}
//             </div>

//             {/* Submit Button */}
//             <div>
//               <button
//                 type="submit"
//                 disabled={status.loading}
//                 className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
//                                          hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-0.5
//                                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
//                                          disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none
//                                          flex items-center justify-center gap-2"
//               >
//                 {status.loading ? (
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <Send className="w-5 h-5" />
//                 )}
//                 {status.loading ? 'Sending...' : 'Send Message'}
//               </button>
//             </div>

//             {/* General Server Error Message */}
//             <AnimatePresence>
//               {status.error && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="p-4 text-center text-red-400 bg-red-900/50 rounded-lg"
//                 >
//                   {status.error}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </form>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };


// // =================================================================
// // 🚀 2. ContactPage Component (Parent)
// // =================================================================
// // ... (Parent component JSX - no changes) ...
// const pageVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       staggerChildren: 0.1
//     }
//   },
// };
// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const ContactPage = () => {
//   return (
//     <motion.div
//       className="container mx-auto max-w-6xl p-4 sm:p-6 md:p-10"
//       variants={pageVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <motion.h1
//         className="text-3xl md:text-4xl font-bold mb-8 text-center text-white flex items-center justify-center gap-3"
//         variants={itemVariants}
//       >
//         <MessageSquareQuote className="w-8 h-8" />
//         Let's Build Something Great
//       </motion.h1>

//       <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

//         {/* --- LEFT COLUMN (Intro) --- */}
//         <motion.div className="lg:w-1/2" variants={itemVariants}>
//           <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
//             Why We Should Talk
//           </h2>
//           <p className="text-gray-300 mb-6 leading-relaxed">
//             I partner with clients and teams to turn complex ideas into elegant,
//             high-performance web applications.
//           </p>
//           <p className="text-gray-300 mb-6 leading-relaxed">
//             If you're looking for a developer who thinks like an architect,
//             builds with precision, and is obsessed with quality, you're in the right place.
//           </p>
//           <p className="text-gray-300 mb-6 font-semibold">
//             My inbox is open for:
//           </p>

//           <ul className="text-gray-300 mb-8 space-y-3">
//             <li className="flex items-center gap-3">
//               <Rocket className="w-5 h-5 text-blue-400 flex-shrink-0" />
//               <span>Building your next full-stack application from scratch.</span>
//             </li>
//             <li className="flex items-center gap-3">
//               <Monitor className="w-5 h-5 text-blue-400 flex-shrink-0" />
//               <span>Creating a blazing-fast, modern frontend for your product.</span>
//             </li>
//             <li className="flex items-center gap-3">
//               <Database className="w-5 h-5 text-blue-400 flex-shrink-0" />
//               <span>Designing a scalable and secure backend API.</span>
//             </li>
//             <li className="flex items-center gap-3">
//               <Coffee className="w-5 h-5 text-blue-400 flex-shrink-0" />
//               <span>A (virtual) coffee to talk about technology!</span>
//             </li>
//           </ul>

//           {/* --- IMPROVED RESPONSIVE EMAIL BUTTON --- */}
//           <a
//             href="mailto:aayushtripathi.tech@gmail.com"
//             className="lg:hidden w-full flex items-center justify-center p-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors gap-2"
//           >
//             <Mail className="w-5 h-5" />
//             Email Me Directly
//           </a>

//           <div className="hidden lg:block">
//             <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
//               <Mail className="w-5 h-5" />
//               Direct Email
//             </h3>
//             <a
//               href="mailto:aayushtripathi.tech@gmail.com"
//               className="text-blue-400 hover:underline text-lg"
//             >
//               aayushtripathi.tech@gmail.com
//             </a>
//           </div>

//           {/* --- IMPROVED RESPONSIVE SOCIALS (UPDATED with FaWhatsapp) --- */}
//           <div className="flex justify-center md:justify-start gap-4 md:gap-6 mt-8">

//             {/* LinkedIn Link */}
//             <a
//               href="https://www.linkedin.com/in/aayushtripathi081103/"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="LinkedIn"
//               className="
//       /* Mobile styles (default) */
//       flex h-12 w-12 items-center justify-center rounded-full 
//       bg-gray-800/50 text-gray-400 
//       transition-all duration-300 
      
//       /* Desktop overrides */
//       md:h-auto md:w-auto md:rounded-none md:bg-transparent 
      
//       /* Responsive hover */
//       hover:bg-white hover:text-gray-900 
//       md:hover:bg-transparent md:hover:text-white 
      
//       /* Focus */
//       focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900
//     "
//             >
//               <Linkedin className="w-6 h-6" />
//             </a>

//             {/* GitHub Link */}
//             <a
//               href="https://github.com/Aayush8113"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="GitHub"
//               className="
//       /* Mobile styles (default) */
//       flex h-12 w-12 items-center justify-center rounded-full 
//       bg-gray-800/50 text-gray-400 
//       transition-all duration-300 
      
//       /* Desktop overrides */
//       md:h-auto md:w-auto md:rounded-none md:bg-transparent 
      
//       /* Responsive hover */
//       hover:bg-white hover:text-gray-900 
//       md:hover:bg-transparent md:hover:text-white 
      
//       /* Focus */
//       focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900
//     "
//             >
//               <Github className="w-6 h-6" />
//             </a>

//             {/* WhatsApp Link */}
//             <a
//               href="https://wa.me/+919737759381"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="WhatsApp"
//               className="
//       /* Mobile styles (default) */
//       flex h-12 w-12 items-center justify-center rounded-full 
//       bg-gray-800/50 text-gray-400 
//       transition-all duration-300 
      
//       /* Desktop overrides */
//       md:h-auto md:w-auto md:rounded-none md:bg-transparent 
      
//       /* Responsive hover */
//       hover:bg-white hover:text-gray-900 
//       md:hover:bg-transparent md:hover:text-white 
      
//       /* Focus */
//       focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900
//     "
//             >
//               <FaWhatsapp className="w-6 h-6" />
//             </a>

//           </div>
//         </motion.div>

//         {/* --- RIGHT COLUMN (The Form) --- */}
//         <motion.div className="lg:w-1/2" variants={itemVariants}> {/* Corrected typo */}
//           <div className="bg-gray-800/50 p-6 md:p-8 rounded-lg shadow-xl border border-gray-700/50">

//             <h3 className="text-2xl font-bold text-white text-center mb-4">
//               Send Me a Message
//             </h3>
//             <p className="text-center text-gray-300 mb-8 flex items-center justify-center gap-2">
//               <Send className="w-4 h-4" />
//               I'll get back to you as soon as possible.
//             </p>

//             <ContactForm />
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default ContactPage;










// /frontend/src/pages/ContactPage.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquareQuote,
  Mail,
  Rocket,
  Monitor,
  Database,
  Coffee,
} from "lucide-react";
import ContactForm from "../components/ContactForm";

// ---------------------------------------------------------
// ✨ Background Particle Generator (Cinematic Edition)
// ---------------------------------------------------------
const FloatingParticles = () => {
  const particles = Array.from({ length: 16 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/40 shadow-[0_0_10px_rgba(96,165,250,0.7)]"
          initial={{
            // use percentage instead of window.* to avoid issues
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: Math.random() * 0.8 + 0.4,
            opacity: 0.2 + Math.random() * 0.5,
          }}
          animate={{
            y: ["0%", "-12%", "0%"],
            x: ["0%", "6%", "-4%", "0%"],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ---------------------------------------------------------
// ✨ Title Animation
// ---------------------------------------------------------
const titleVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// ---------------------------------------------------------
// ✨ Section Fade-in Animation
// ---------------------------------------------------------
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ---------------------------------------------------------
// ★★★★★ MAIN CONTACT PAGE
// ---------------------------------------------------------
const ContactPage = () => {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      className="relative min-h-[calc(100vh-4rem)]" // give breathing room under navbar
    >
      {/* Background Particles */}
      <FloatingParticles />

      <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-10 lg:py-16 z-10">
        {/* Title */}
        <motion.header
          variants={titleVariants}
          className="mb-10 sm:mb-12 lg:mb-16 text-center"
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white 
                       drop-shadow-[0_0_10px_rgba(99,102,241,0.7)] 
                       flex flex-wrap items-center justify-center gap-3"
          >
            <MessageSquareQuote className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />
            <span>Let&apos;s Build Something Great</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Share your idea, project, or even just a rough concept — I’ll help
            you turn it into a clean, fast, and scalable MERN experience.
          </p>
        </motion.header>

        {/* ================== MAIN GRID ================== */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* --------------------------------------------- */}
          {/* LEFT SIDE — INFO PANEL */}
          {/* --------------------------------------------- */}
          <motion.section
            className="w-full lg:w-1/2 space-y-6"
            variants={fadeInUp}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-semibold text-white 
                         drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]"
              variants={fadeInUp}
            >
              Why We Should Talk
            </motion.h2>

            <motion.p
              className="text-gray-300 leading-relaxed text-sm sm:text-base"
              variants={fadeInUp}
            >
              I collaborate with founders, developers, and teams to craft
              beautiful, scalable, and high-performance digital experiences —
              the kind that feel modern, polished, and reliable.
            </motion.p>

            <motion.p
              className="text-gray-300 leading-relaxed text-sm sm:text-base"
              variants={fadeInUp}
            >
              If you&apos;re looking for a MERN developer who cares about clean
              architecture, detailed UI/UX, and long-term maintainability —
              you&apos;re in the right place.
            </motion.p>

            <motion.p
              className="text-gray-300 font-semibold text-sm sm:text-base"
              variants={fadeInUp}
            >
              I can help you with:
            </motion.p>

            {/* Feature List */}
            <motion.ul
              className="text-gray-300 space-y-3 sm:space-y-4 text-sm sm:text-base"
              variants={fadeInUp}
            >
              <li className="flex gap-3 items-start">
                <Rocket className="text-blue-400 w-6 h-6 flex-shrink-0 mt-0.5" />
                <span>Complete full-stack web app development (MERN)</span>
              </li>

              <li className="flex gap-3 items-start">
                <Monitor className="text-blue-400 w-6 h-6 flex-shrink-0 mt-0.5" />
                <span>Lightning-fast frontends using React + Tailwind CSS</span>
              </li>

              <li className="flex gap-3 items-start">
                <Database className="text-blue-400 w-6 h-6 flex-shrink-0 mt-0.5" />
                <span>Scalable APIs and backend logic with Express + MongoDB</span>
              </li>

              <li className="flex gap-3 items-start">
                <Coffee className="text-blue-400 w-6 h-6 flex-shrink-0 mt-0.5" />
                <span>Or just a friendly tech chat to explore ideas</span>
              </li>
            </motion.ul>

            {/* Email Link + Small Helper Text */}
            <div className="pt-2 space-y-3">
              <motion.a
                variants={fadeInUp}
                href="mailto:aayushtripathi.tech@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 
                           bg-blue-600 text-white font-semibold rounded-lg 
                           shadow-xl hover:bg-blue-700 hover:shadow-blue-500/40 
                           transition-all text-sm sm:text-base"
              >
                <Mail className="inline w-5 h-5 mr-2" />
                Email Me Directly
              </motion.a>

              <motion.p
                variants={fadeInUp}
                className="text-xs sm:text-sm text-gray-400"
              >
                Prefer email instead of a form? No problem — I read every message
                personally.
              </motion.p>
            </div>
          </motion.section>

          {/* --------------------------------------------- */}
          {/* RIGHT SIDE — FORM PANEL */}
          {/* --------------------------------------------- */}
          <motion.section
            className="w-full lg:w-1/2"
            variants={fadeInUp}
          >
            <motion.div
              className="relative bg-gray-900/70 border border-gray-700/70 
                         rounded-xl shadow-2xl p-5 sm:p-6 md:p-8 
                         backdrop-blur-md overflow-hidden"
              initial={{ opacity: 0.3, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Glow border animation */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl border border-indigo-500/30"
                animate={{ opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3 sm:mb-4 
                               drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                  Send Me a Message
                </h3>

                <p className="text-center text-gray-300 mb-6 sm:mb-8 flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Mail className="w-5 h-5 text-blue-400" />
                  I usually respond as soon as I can.
                </p>

                {/* FORM ITSELF */}
                <ContactForm />
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
};

export default ContactPage;
