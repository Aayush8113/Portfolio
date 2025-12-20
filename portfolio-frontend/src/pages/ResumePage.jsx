// // frontend/src/pages/ResumePage.jsx

// import React from "react";
// import { Download, Phone, Mail, Github, Linkedin, ArrowLeft } from "lucide-react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// // --- FRAMER MOTION VARIANTS ---

// // 1. Overall Page Container Animation (Controls the staging)
// const pageContainerVariants = {
//   hidden: { opacity: 0, scale: 0.98 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//       staggerChildren: 0.2, // This controls the timing between section entries
//     },
//   },
// };

// // 2. Section Entry Animation (Applied to each motion.div section wrapper)
// const sectionVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.4, 0.0, 0.2, 1],
//     },
//   },
// };

// // Motion-enabled Link (defined once)
// const MotionLink = motion(Link);

// // --- RESUME PAGE COMPONENT ---
// const ResumePage = () => {
//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-10">
//       {/* Main Animated Container */}
//       <motion.div
//         className="container mx-auto max-w-4xl bg-gray-800 rounded-lg shadow-2xl p-6 md:p-10 border border-blue-800/50"
//         variants={pageContainerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* 1. Navigation & Action Buttons */}
//         <motion.div
//           className="flex justify-between items-center mb-6"
//           variants={sectionVariants}
//         >
//           <MotionLink
//             to="/about"
//             className="text-blue-400 hover:text-blue-300 transition-colors duration-300 inline-flex items-center gap-2"
//             whileHover={{ gap: 8 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back to About
//           </MotionLink>

//           <motion.button
//             onClick={() => window.print()}
//             className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out inline-flex items-center gap-2"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Download className="w-4 h-4" />
//             Save as PDF
//           </motion.button>
//         </motion.div>

//         {/* 2. HEADER / CONTACT INFO */}
//         <motion.div
//           variants={sectionVariants}
//           className="pb-4 border-b-4 border-blue-600 mb-6"
//         >
//           <header>
//             <h1 className="text-4xl font-extrabold text-white tracking-tight">
//               Aayush Tripathi
//             </h1>
//             <p className="text-xl font-medium text-blue-400 mt-1">
//               Aspiring Full Stack Developer (MERN Stack)
//             </p>

//             {/* Contact Links */}
//             <div className="flex flex-wrap gap-x-6 gap-y-3 mt-3 text-sm text-gray-300">
//               <div className="flex items-center">
//                 <Phone className="w-4 h-4 mr-1 text-blue-500" />
//                 <span>+91 9737759381</span>
//               </div>
//               <div className="flex items-center">
//                 <Mail className="w-4 h-4 mr-1 text-blue-500" />
//                 <span>aayushtripathi.tech@gmail.com</span>
//               </div>
//               <a
//                 href="https://linkedin.com/in/aayushtripathi081103"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center hover:text-blue-400 transition"
//               >
//                 <Linkedin className="w-4 h-4 mr-1 text-blue-500" />
//                 <span>LinkedIn</span>
//               </a>
//               <a
//                 href="https://github.com/Aayush8113"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center hover:text-blue-400 transition"
//               >
//                 <Github className="w-4 h-4 mr-1 text-blue-500" />
//                 <span>GitHub</span>
//               </a>
//             </div>

//             <p className="text-sm text-gray-400 mt-2">
//               2, Atilaxmi Tenament, Navavadaj, Ahmedabad, Gujarat
//             </p>
//           </header>
//         </motion.div>

//         {/* 3. PROFESSIONAL SUMMARY */}
//         <motion.div variants={sectionVariants} className="mb-6">
//           <section>
//             <h2 className="text-2xl font-bold text-white pb-1 mb-3 border-b-2 border-blue-500">
//               Professional Summary
//             </h2>
//             <p className="text-gray-300 leading-relaxed text-base">
//               Aspiring Full Stack Developer with a robust foundation in the{" "}
//               <span className="font-semibold">MERN stack</span> (MongoDB,
//               Express.js, React, Node.js). Eager to apply strong
//               problem-solving skills and a passion for web technologies to
//               contribute to innovative projects and build high-quality,
//               responsive applications. Experienced in developing scalable{" "}
//               <span className="font-semibold">CRUD applications</span> and
//               committed to continuous learning in data structures and
//               algorithms.
//             </p>
//           </section>
//         </motion.div>

//         {/* 4. WORK EXPERIENCE */}
//         <motion.div variants={sectionVariants} className="mb-6">
//           <section>
//             <h2 className="text-2xl font-bold text-white pb-1 mb-3 border-b-2 border-blue-500">
//               Work Experience
//             </h2>

//             <div className="mb-4 p-4 bg-gray-700/50 rounded-lg">
//               <div className="flex justify-between items-start">
//                 <h3 className="text-lg font-semibold text-white">
//                   MERN Stack Developer Intern
//                 </h3>
//                 <p className="text-sm text-gray-400 text-right font-medium">
//                   3 Months
//                 </p>
//               </div>
//               <div className="flex justify-between items-start mb-2">
//                 <p className="text-base text-gray-300">FRANMAXINDIA PVT</p>
//                 <p className="text-sm text-gray-400 text-right font-medium">
//                   Ahmedabad
//                 </p>
//               </div>

//               <ul className="list-disc list-outside ml-5 text-gray-300 text-base space-y-1">
//                 <li>
//                   Contributed to the development cycle utilizing the MERN
//                   stack, gaining practical experience in production environment
//                   workflows.
//                 </li>
//                 <li>
//                   Assisted in the implementation of API endpoints using Node.js
//                   and Express.js to handle business logic and data exchange.
//                 </li>
//                 <li>
//                   Developed responsive and interactive user interfaces using
//                   React.js and modern styling techniques.
//                 </li>
//                 <li>
//                   Managed and manipulated database structures using MongoDB,
//                   ensuring data integrity and application functionality.
//                 </li>
//               </ul>
//             </div>
//           </section>
//         </motion.div>

//         {/* 5. TECHNICAL SKILLS */}
//         <motion.div variants={sectionVariants} className="mb-6">
//           <section>
//             <h2 className="text-2xl font-bold text-white pb-1 mb-3 border-b-2 border-blue-500">
//               Technical Skills
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-300">
//               <div>
//                 <strong className="text-white">Frontend:</strong>
//                 <span>
//                   {" "}
//                   HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS,
//                   Bootstrap, Next.js
//                 </span>
//               </div>
//               <div>
//                 <strong className="text-white">Backend &amp; DB:</strong>
//                 <span> Node.js, Express.js, MongoDB</span>
//               </div>
//               <div>
//                 <strong className="text-white">Tools &amp; Platforms:</strong>
//                 <span> Git, GitHub, VSCode, RESTful APIs</span>
//               </div>
//             </div>
//           </section>
//         </motion.div>

//         {/* 6. PROJECTS */}
//         <motion.div variants={sectionVariants} className="mb-6">
//           <section>
//             <h2 className="text-2xl font-bold text-white pb-1 mb-3 border-b-2 border-blue-500">
//               Projects
//             </h2>

//             {/* Project 1: Task Manager App */}
//             <div className="mb-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
//               <h3 className="text-lg font-semibold text-white">
//                 Task Manager App
//               </h3>
//               <p className="text-sm text-blue-400 mb-2">
//                 Full Stack MERN Application
//               </p>
//               <ul className="list-disc list-outside ml-5 text-gray-300 text-base space-y-1">
//                 <li>
//                   Developed a full-stack CRUD (Create, Read, Update, Delete)
//                   application using the MERN stack.
//                 </li>
//                 <li>
//                   Built a dynamic and intuitive user interface with React.js to
//                   manage tasks effectively.
//                 </li>
//                 <li>
//                   Implemented a robust Node.js/Express.js backend for API
//                   management and routing.
//                 </li>
//                 <li>
//                   Utilized MongoDB for persistent and scalable data storage.
//                 </li>
//               </ul>
//             </div>

//             {/* Project 2: Personal Portfolio Website */}
//             <div className="mb-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
//               <h3 className="text-lg font-semibold text-white">
//                 Personal Portfolio Website
//               </h3>
//               <p className="text-sm text-blue-400 mb-2">Frontend Development</p>
//               <ul className="list-disc list-outside ml-5 text-gray-300 text-base space-y-1">
//                 <li>
//                   Designed and built a fully responsive personal portfolio using
//                   modern HTML5, CSS3, and JavaScript.
//                 </li>
//                 <li>
//                   Effectively showcases projects, technical skills, and
//                   professional experience to potential employers.
//                 </li>
//                 <li>
//                   Focus on clean, semantic code and optimal cross-device
//                   performance.
//                 </li>
//               </ul>
//             </div>
//           </section>
//         </motion.div>

//         {/* 7. EDUCATION & DEVELOPMENT */}
//         <motion.div variants={sectionVariants} className="mb-6">
//           <section>
//             <h2 className="text-2xl font-bold text-white pb-1 mb-3 border-b-2 border-blue-500">
//               Education &amp; Professional Development
//             </h2>

//             {/* Education - B.E. */}
//             <div className="flex justify-between items-start mb-2">
//               <div>
//                 <h3 className="text-lg font-semibold text-white">
//                   Bachelor of Engineering - Computer Engineering
//                 </h3>
//                 <p className="text-base text-gray-300">
//                   Gandhinagar Institute of Technology, Gandhinagar
//                 </p>
//               </div>
//               <p className="text-sm text-gray-400 text-right font-medium">
//                 Pursuing 5th Semester
//               </p>
//             </div>

//             {/* Development - Self Study */}
//             <div className="mb-4">
//               <h3 className="text-lg font-semibold text-white">
//                 1 Year Full Stack Development (MERN) - Self-Study
//               </h3>
//               <p className="text-base text-gray-300">
//                 Focused Self-Study Program (2024)
//               </p>
//               <ul className="list-disc list-outside ml-5 text-gray-300 text-sm space-y-1 mt-2">
//                 <li>
//                   Completed comprehensive study covering the full MERN stack,
//                   including advanced topics in Data Structures and Algorithms.
//                 </li>
//                 <li>
//                   Gained practical proficiency in using Git and GitHub for
//                   version control and collaborative development.
//                 </li>
//               </ul>
//             </div>
//           </section>
//         </motion.div>

//         {/* 8. SOFT SKILLS & INTERESTS */}
//         <motion.div variants={sectionVariants}>
//           <section>
//             <h2 className="text-2xl font-bold text-white pb-1 mb-3 border-b-2 border-blue-500">
//               Soft Skills &amp; Interests
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Soft Skills */}
//               <div>
//                 <h3 className="text-lg font-semibold text-white mb-2">
//                   Core Soft Skills
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs font-medium rounded-full">
//                     Problem Solving
//                   </span>
//                   <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs font-medium rounded-full">
//                     Effective Communication
//                   </span>
//                   <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs font-medium rounded-full">
//                     Collaborative Teamwork
//                   </span>
//                   <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs font-medium rounded-full">
//                     Adaptability
//                   </span>
//                 </div>
//               </div>

//               {/* Languages & Activities */}
//               <div>
//                 <h3 className="text-lg font-semibold text-white mb-2">
//                   Languages &amp; Activities
//                 </h3>
//                 <p className="text-sm text-gray-300 mb-1">
//                   <strong className="text-white">Languages:</strong> English
//                   (Fluent), Hindi (Fluent), Gujarati (Native)
//                 </p>
//                 <p className="text-sm text-gray-300">
//                   <strong className="text-white">Interests:</strong> Drawing,
//                   Sketching, Swimming, Reading technology books
//                 </p>
//               </div>
//             </div>
//           </section>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default ResumePage;


















// frontend/src/pages/ResumePage.jsx (Cleaned & Formatted)

import React from "react";
import {
  Phone,
  Mail,
  Github,
  Linkedin,
  ArrowLeft,
  Code2,
  Server,
  Wrench,
  GraduationCap, 
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { QRCode } from "react-qr-code"; 

// =======================
// ANIMATION VARIANTS
// =======================
const pageContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const cardHoverProps = {
  whileHover: { scale: 1.01, boxShadow: "0 0 15px rgba(30,64,175,0.4)" },
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

const MotionLink = motion.create(Link);

// =======================
// MAIN COMPONENT
// =======================
const ResumePage = () => {
  const githubURL = "https://github.com/Aayush8113";
  const linkedinURL = "https://linkedin.com/in/aayushtripathi081103";
  const phoneNum = "+919737759381";
  const emailAddr = "aayushtripathi.tech@gmail.com";
  
  // 🛑 CRITICAL: REPLACE THIS WITH YOUR ACTUAL PUBLIC PDF LINK 🛑
  const pdfDownloadLink = "https://github.com/Aayush8113/Resume/blob/main/Aayush%20Tripathi%20-%20Developer%20Resume.pdf"; 
  const qrCodeLink = pdfDownloadLink; 

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-2 md:p-8 print:bg-white print:text-black print:p-0">

      {/* 🛑 CRITICAL PRINT STYLING FOR 2-PAGE LIMIT 🛑 */}
      <style>{`
        @page {
          size: A4;
          margin: 0.4in 0.5in;
        }
        @media print {
          /* General Print Optimizations */
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-size: 9.5pt;
            line-height: 1.35;
            color: #000 !important;
          }
          
          /* Resume Wrapper Optimization */
          .resume-wrapper {
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            padding: 0 !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          /* Print Colors & Typography */
          .print-text-dark { color: #111 !important; }
          .print-text-blue { color: #1e40af !important; }
          .section-title {
            border-bottom: 2px solid #1e40af !important;
            padding-bottom: 2px !important;
            margin-bottom: 8px !important;
            font-size: 14pt !important; 
          }
          
          /* Element Density */
          ul { margin-top: 4px !important; }
          li { margin-bottom: 2px !important; }
          section { margin-bottom: 15px !important; } 
          .skill-tag-group { margin-top: 4px; }
          
          /* --- PDF LINK IMPROVEMENT (Ensure text shows) --- */
          .contact-link-icon {
              color: #1e40af !important;
              display: inline-block;
          }
          
          /* QR Code is hidden in print */
          .qr-wrapper {
              display: none !important;
          }
        }
      `}</style>

      {/* MAIN RESUME WRAPPER */}
      <motion.div
        className="
          resume-wrapper container mx-auto max-w-4xl 
          bg-gray-900/80 backdrop-blur 
          rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.25)]
          p-6 md:p-10 border border-blue-700/40 
          print:shadow-none print:border-none print:bg-white print:text-black
        "
        variants={pageContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ======================= */}
        {/* QR CODE (Hidden on Mobile, Visible on Tablet/PC)  */}
        {/* ======================= */}
        <div className="absolute top-8 right-8 z-10 print:hidden hidden md:block"> 
            <motion.div 
              className="p-3 bg-slate-800/90 rounded-xl shadow-lg border border-blue-600/50 qr-wrapper"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex flex-col items-center">
                <QRCode 
                  value={qrCodeLink} 
                  size={80} 
                  level="M" 
                  className="bg-white p-1 rounded-sm" 
                />
                {/* Actionable Text */}
                <p className="text-sm font-semibold text-blue-300 mt-2 text-center">
                  Scan to Download PDF
                </p>
              </div>
            </motion.div>
        </div>


        {/* --- TOP BAR (Web View Nav) --- */}
        <motion.div
          className="flex justify-between items-center mb-6 print:hidden"
          variants={sectionVariants}
        >
          <MotionLink
            to="/about"
            className="text-blue-400 hover:text-blue-300 transition inline-flex items-center gap-2"
            whileHover={{ gap: 8 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to About
          </MotionLink>
        </motion.div>

        {/* ======================= */}
        {/* HEADER SECTION        */}
        {/* ======================= */}
        <motion.div variants={sectionVariants} className="pb-4 border-b border-blue-700/60 mb-6 print:border-black/30">
          <header>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              
              {/* Left Side: Name & Contact Details */}
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white print:text-black">
                  Aayush Tripathi
                </h1>
                <p className="text-lg md:text-xl font-medium text-blue-400 mt-1 print:text-blue-700 print-text-blue">
                  Aspiring Full Stack Developer (MERN)
                </p>

                {/* Horizontal Divider for Print Clarity */}
                <div className="h-0.5 w-full bg-blue-700/60 mt-2 print:bg-gray-400 print:mb-2 print:mt-1" />

                {/* CONTACT ROW */}
                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm header-contact-row print:text-[9.5pt]">
                  
                  {/* Phone Link */}
                  <a href={`tel:${phoneNum}`} className="flex items-center hover:text-blue-400 print:text-black">
                    <Phone className="w-4 h-4 mr-1 text-blue-500 contact-link-icon" />
                    {phoneNum}
                  </a>

                  {/* Email Link */}
                  <a
                    href={`mailto:${emailAddr}?subject=Resume Inquiry`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-400 print:text-black"
                  >
                    <Mail className="w-4 h-4 mr-1 text-blue-500 contact-link-icon" />
                    {emailAddr}
                  </a>

                  {/* LinkedIn Link */}
                  <a
                    href={linkedinURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-400 print:text-black"
                  >
                    <Linkedin className="w-4 h-4 mr-1 text-blue-500 contact-link-icon" />
                    linkedin.com/in/aayushtripathi081103
                  </a>

                  {/* GitHub Link */}
                  <a
                    href={githubURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-400 print:text-black"
                  >
                    <Github className="w-4 h-4 mr-1 text-blue-500 contact-link-icon" />
                    github.com/Aayush8113
                  </a>
                </div>

                <p className="text-xs mt-2 text-gray-400 print:text-black">
                  2, Atilaxmi Tenament, Navavadaj, Ahmedabad, Gujarat
                </p>
              </div>
              
            </div>
          </header>
        </motion.div>

        {/* ======================= */}
        {/* PROFESSIONAL SUMMARY  */}
        {/* ======================= */}
        <motion.section variants={sectionVariants} className="mb-6">
          <h2 className="section-title text-2xl font-bold text-white mb-3 pb-1 print:text-black print-text-blue">
            Professional Summary
          </h2>

          <p className="text-gray-300 leading-relaxed text-sm md:text-base print:text-black">
            Aspiring Full Stack Developer with a strong foundation in the 
            <span className="font-semibold"> MERN stack</span>. Passionate about 
            building scalable, responsive applications with clean architecture. Experienced in CRUD apps, REST APIs, and modern frontend development with React & Tailwind.
          </p>
        </motion.section>

        {/* ======================= */}
        {/* WORK EXPERIENCE      */}
        {/* ======================= */}
        <motion.section variants={sectionVariants} className="mb-6">
          <h2 className="section-title text-2xl font-bold text-white mb-3 pb-1 print:text-black print-text-blue">
            Work Experience
          </h2>

          <motion.div
            className="p-3 card-content bg-gray-800/70 rounded-xl border border-gray-700/80 print:bg-white"
            {...cardHoverProps}
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white print:text-black">
                  MERN Stack Developer Intern
                </h3>
                <p className="text-sm text-gray-300 print:text-black">FRANMAXINDIA PVT — Ahmedabad</p>
              </div>
              <p className="text-sm text-gray-400 print:text-black">3 Months</p>
            </div>

            <ul className="list-disc ml-5 mt-2 text-gray-300 text-sm print:text-black print:text-[9.5pt]">
              <li>Developed production-level features using the MERN stack.</li>
              <li>Built REST APIs with Node.js + Express.</li>
              <li>Created interactive UI components in React.</li>
              <li>Worked with MongoDB data modeling & CRUD operations.</li>
            </ul>
          </motion.div>
        </motion.section>

        {/* TECHNICAL SKILLS */}
        <motion.section variants={sectionVariants} className="mb-6">
          <h2 className="section-title text-2xl font-bold text-white mb-3 pb-1 print:text-black print-text-blue">
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3"> 
            {/* FRONTEND */}
            <motion.div
              className="p-3 card-content bg-gray-800/80 rounded-xl border border-gray-700/80 print:bg-white"
              {...cardHoverProps}
            >
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-2 text-white print:text-black uppercase print-text-blue">
                <Code2 className="w-4 h-4 text-blue-400 print:text-blue-700" /> Frontend
              </h3>
              <p className="text-xs text-gray-400 mb-2 print:text-black">Building responsive UI with modern stacks.</p>
              <div className="flex flex-wrap gap-1 text-[11px] skill-tag-group">
                {["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS", "Bootstrap"].map(skill => (
                  <span key={skill} className="px-2 py-0.5 rounded-full bg-blue-900/40 text-blue-200 print:bg-gray-200 print:text-black">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
            
            {/* BACKEND */}
            <motion.div
              className="p-3 card-content bg-gray-800/80 rounded-xl border border-gray-700/80 print:bg-white"
              {...cardHoverProps}
            >
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-2 text-white print:text-black uppercase print-text-blue">
                <Server className="w-4 h-4 text-blue-400 print:text-blue-700" /> Backend & DB
              </h3>
              <p className="text-xs text-gray-400 mb-2 print:text-black">API development & database modeling.</p>
              <div className="flex flex-wrap gap-1 text-[11px] skill-tag-group">
                {["Node.js", "Express.js", "MongoDB", "REST APIs"].map(skill => (
                  <span key={skill} className="px-2 py-0.5 rounded-full bg-emerald-900/40 text-emerald-200 print:bg-gray-200 print:text-black">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
            
            {/* TOOLS */}
            <motion.div
              className="p-3 card-content bg-gray-800/80 rounded-xl border border-gray-700/80 print:bg-white"
              {...cardHoverProps}
            >
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-2 text-white print:text-black uppercase print-text-blue">
                <Wrench className="w-4 h-4 text-blue-400 print:text-blue-700" /> Tools & Workflow
              </h3>
              <p className="text-xs text-gray-400 mb-2 print:text-black">Productive modern development environment.</p>
              <div className="flex flex-wrap gap-1 text-[11px] skill-tag-group">
                {["Git", "GitHub", "VS Code", "NPM Scripts", "Responsive Design"].map(skill => (
                  <span key={skill} className="px-2 py-0.5 rounded-full bg-indigo-900/40 text-indigo-200 print:bg-gray-200 print:text-black">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section variants={sectionVariants} className="mb-6">
          <h2 className="section-title text-2xl font-bold text-white mb-3 pb-1 print:text-black print-text-blue">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
            <motion.div
              className="p-3 card-content bg-gray-800/80 rounded-xl border border-gray-700/80 print:bg-white"
              {...cardHoverProps}
            >
              <h3 className="text-lg font-semibold text-white print:text-black">Task Manager App</h3>
              <p className="text-sm text-blue-400 mb-2 print:text-blue-700">Full Stack MERN Application</p>
              <ul className="list-disc ml-5 mt-2 text-gray-300 text-sm print:text-black print:text-[9.5pt] space-y-0.5">
                <li>Built CRUD workflows with MERN stack.</li>
                <li>Designed React UI with reusable components.</li>
                <li>Created backend API using Express.</li>
                <li>Used MongoDB for data persistence.</li>
              </ul>
            </motion.div>
            <motion.div
              className="p-3 card-content bg-gray-800/80 rounded-xl border border-gray-700/80 print:bg-white"
              {...cardHoverProps}
            >
              <h3 className="text-lg font-semibold text-white print:text-black">Portfolio Website</h3>
              <p className="text-sm text-blue-400 mb-2 print:text-blue-700">Frontend Development</p>
              <ul className="list-disc ml-5 mt-2 text-gray-300 text-sm print:text-black print:text-[9.5pt] space-y-0.5">
                <li>Fully responsive modern portfolio with animations.</li>
                <li>Showcases projects, skills & experience.</li>
                <li>Optimized for speed and mobile-first design.</li>
                <li>Utilized React, Tailwind CSS, and Framer Motion.</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>
        
        {/* EDUCATION & SOFT SKILLS (CONSOLIDATED) */}
        <motion.section variants={sectionVariants}>
          <h2 className="section-title text-2xl font-bold text-white mb-3 pb-1 print:text-black print-text-blue">
            Education & Professional Development
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* EDUCATION/STUDY */}
            <div className="space-y-3">
              <motion.div
                className="p-3 card-content bg-gray-800/80 rounded-xl border border-gray-700/80 print:bg-white"
                {...cardHoverProps}
              >
                <h3 className="text-lg font-semibold text-white print:text-black flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-400 print:text-blue-700"/>
                  B.E. Computer Engineering
                </h3>
                <p className="text-sm text-gray-300 print:text-black">
                  Gandhinagar Institute of Technology
                </p>
              </motion.div>

              <motion.div
                className="p-3 card-content bg-gray-800/80 rounded-xl border border-gray-700/80 print:bg-white"
                {...cardHoverProps}
              >
                <h3 className="text-lg font-semibold text-white print:text-black">
                  Full Stack Development (MERN)
                </h3>
                <p className="text-sm text-gray-300 print:text-black">
                  1 Year Self Study: MERN + DSA fundamentals.
                </p>
              </motion.div>
            </div>


            {/* SOFT SKILLS (Condensed) */}
            <motion.div
              className="p-3 card-content bg-gray-800/80 rounded-xl border border-gray-700/80 print:bg-white"
              {...cardHoverProps}
            >
              <h3 className="text-lg font-semibold text-white mb-2 print:text-black">
                Soft Skills & Languages
              </h3>
              <p className="text-sm text-gray-300 mb-1 print:text-black">
                Skills: Problem Solving, Communication, Teamwork, Adaptability.
              </p>
              <p className="text-sm text-gray-300 print:text-black">
                Languages: English (Fluent), Hindi (Fluent), Gujarati (Native).
              </p>
            </motion.div>

          </div>
        </motion.section>


      </motion.div>
    </div>
  );
};

export default ResumePage;