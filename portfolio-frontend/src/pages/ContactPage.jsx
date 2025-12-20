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










import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, Linkedin, Github, Terminal, 
  ExternalLink, Cpu, Globe, Check
} from "lucide-react";
import ContactForm from "../components/ContactForm";
import { FaWhatsapp } from 'react-icons/fa';

// --- Background ---
const CyberGrid = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-[#020617]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:50px_50px]" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
  </div>
);

// --- VS Code Style Card ---
const CodeProfile = () => (
  <div className="hidden lg:block bg-[#0f172a] rounded-lg border border-slate-800 shadow-2xl overflow-hidden font-mono text-[11px] mb-8">
    <div className="bg-[#1e293b] px-4 py-2 flex items-center justify-between border-b border-slate-700/50">
      <span className="text-slate-400">user_profile.tsx</span>
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
      </div>
    </div>
    <div className="p-5 text-slate-400 leading-relaxed">
      <p><span className="text-purple-400">const</span> <span className="text-blue-400">Engineer</span> = <span className="text-yellow-300">{`{`}</span></p>
      <div className="pl-4 space-y-1">
        <p>name: <span className="text-green-400">"Aayush Tripathi"</span>,</p>
        <p>status: <span className="text-green-400">"Online"</span>,</p>
        <p>stack: <span className="text-yellow-300">["MERN", "NextJS", "AWS"]</span>,</p>
        <p>availability: <span className="text-blue-400">true</span>,</p>
      </div>
      <p><span className="text-yellow-300">{`}`}</span>;</p>
    </div>
  </div>
);

const ContactPage = () => {
  return (
    <motion.main 
      className="relative min-h-[calc(100vh-4rem)] text-slate-200 flex items-center justify-center py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CyberGrid />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-md mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">System Operational</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            INITIATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">PROTOCOL</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-mono">
            SECURE CHANNEL OPEN. DEPLOY YOUR PROJECT REQUREMENTS BELOW.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* --- LEFT: INFO & LINKS --- */}
          <div className="lg:col-span-5 space-y-6">
            <CodeProfile />
            
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4" /> Uplink Channels
            </h3>

            {/* Email Card */}
            <a href="mailto:aayushtripathi.tech@gmail.com" 
               className="group flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all">
              <div className="w-12 h-12 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-mono uppercase">Priority Mail</p>
                <p className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">aayushtripathi.tech</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-700 ml-auto group-hover:text-blue-400" />
            </a>

            {/* LinkedIn Card */}
            <a href="https://www.linkedin.com/in/aayushtripathi081103/" target="_blank" rel="noreferrer"
               className="group flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all">
              <div className="w-12 h-12 rounded bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-mono uppercase">Professional Net</p>
                <p className="text-white font-semibold text-sm group-hover:text-indigo-400 transition-colors">LinkedIn Profile</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-700 ml-auto group-hover:text-indigo-400" />
            </a>

            <div className="grid grid-cols-2 gap-4">
               <a href="https://github.com/Aayush8113" target="_blank" rel="noreferrer"
                 className="group p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-white/20 transition-all text-center hover:bg-slate-900">
                  <Github className="w-6 h-6 text-slate-500 group-hover:text-white mx-auto mb-2 transition-colors" />
                  <span className="text-xs font-bold text-slate-400">GITHUB</span>
               </a>
               <a href="https://wa.me/+919737759381" target="_blank" rel="noreferrer"
                 className="group p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all text-center hover:bg-slate-900">
                  <FaWhatsapp className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 mx-auto mb-2 transition-colors" />
                  <span className="text-xs font-bold text-slate-400">WHATSAPP</span>
               </a>
            </div>
          </div>

          {/* --- RIGHT: THE FORM --- */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl relative">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Cpu className="w-32 h-32 text-blue-500" strokeWidth={0.5} />
              </div>
              
              <div className="relative z-10 mb-8 border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-500" />
                  DATA ENTRY TERMINAL
                </h2>
              </div>

              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </motion.main>
  );
};

export default ContactPage;