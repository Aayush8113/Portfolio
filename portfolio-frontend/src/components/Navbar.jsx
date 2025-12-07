import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  MapPin, 
  Menu, 
  X, 
  Home, 
  User, 
  Code, 
  FileText,
  Zap,
  Briefcase,
} from "lucide-react";

// --- Configuration Constants ---
const RESUME_ROUTE = "/resume";
const DEVELOPER_STATUS = "Open to New Opportunities · Ahmedabad, IN";
const DEVELOPER_TITLE = "Full-Stack MERN Developer";
const GITHUB_URL = "https://github.com/Aayush8113";
const LINKEDIN_URL = "https://linkedin.com/in/aayushtripathi081103";

// --- Utility Class Name Consolidation ---

// Base style for social icon buttons
const ICON_BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 p-2 text-slate-200 transition-all hover:border-indigo-500 hover:text-indigo-300 hover:shadow-[0_0_18px_rgba(79,70,229,0.7)]";

// -------------------------
// MINI AT LOGO (Cinematic Animated SVG Monogram)
// -------------------------
const ATLogo = () => (
  <motion.div
    className="relative flex h-10 w-10 items-center justify-center 
               rounded-full border border-indigo-500/70 bg-slate-950/90 
               shadow-[0_0_18px_rgba(79,70,229,0.7)] overflow-hidden"
  >
    {/* Cinematic Outer Ring (Subtle Constant Rotation) */}
    <motion.div
        className="absolute inset-[-4px] rounded-full border border-indigo-500/0"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
        {/* Pulsating glow */}
        <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/40 via-sky-400/20 to-transparent blur-xl opacity-70"
            animate={{ opacity: [0.7, 0.5, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
    </motion.div>

    {/* Inner circle with SVG mark */}
    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/95">
      <svg
        viewBox="0 0 32 32"
        className="h-6 w-6 text-indigo-300 drop-shadow-[0_0_10px_rgba(129,140,248,0.9)]"
      >
        <motion.path
          d="M8 22 L12 10 L16 22 M10 17 L14 17 M20 10 L26 10 M23 10 L23 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
      </svg>
    </div>
  </motion.div>
);

// -------------------------
// MOTION VARIANTS
// -------------------------
const navbarVariants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.4, 1.0] },
  },
};

const mobileDropdownVariants = {
  hidden: { opacity: 0, height: 0, y: -8 },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -8,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

// -------------------------
// NAVBAR COMPONENT
// -------------------------
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Desktop NavLink styling (Cinematic/Holographic Hover)
  const getNavLinkClass = ({ isActive }) =>
    [
      "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center gap-2",
      "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950",
      "group",
      isActive
        ? "bg-indigo-500/20 text-indigo-300 shadow-[0_0_18px_rgba(79,70,229,0.55)] border border-indigo-500/50"
        : "text-slate-200 border border-transparent hover:text-indigo-200 hover:border-indigo-500/40 hover:bg-slate-800/60",
    ].join(" ");
    
  // Mobile NavLink styling (Modern/Minimal)
  const getMobileLinkClass = ({ isActive }) =>
    [
      "block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200",
      isActive
        ? "bg-indigo-700/30 text-indigo-300 border-l-4 border-indigo-500 shadow-md"
        : "text-slate-100 hover:bg-slate-800/70 hover:text-indigo-300",
      "flex items-center gap-4 focus:outline-none focus:bg-slate-800/80"
    ].join(" ");

  const handleMobileNavClick = () => {
    setIsOpen(false);
  };

  // Split the DEVELOPER_STATUS string for icon placement
  const statusParts = DEVELOPER_STATUS.split("·");
  const opportunityStatus = statusParts[0].trim(); // "Open to New Opportunities"
  const locationStatus = statusParts.length > 1 ? statusParts[1].trim() : ""; // "Ahmedabad, IN"

  return (
    <>
      {/* MAIN NAVBAR (DESKTOP + MOBILE BAR) */}
      <motion.nav
        // FIX: Added overflow-x-hidden to prevent horizontal scroll issues from border glows/motion effects
        className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-3xl border-b border-slate-800/70 overflow-x-hidden"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        aria-label="Main Navigation"
      >
        <div className="relative">
          {/* Cinematic Bottom Border Element */}
          <motion.div 
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-indigo-500/0 via-sky-400/80 to-indigo-500/0"
            animate={{ 
                scaleX: [0.8, 1.05, 0.8],
                opacity: [0.6, 1, 0.6]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
          />

          <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-3.5">
            
            {/* LEFT: Logo + Name + Status */}
            <Link to="/" className="flex items-center gap-3 group" aria-label="Aayush Tripathi - Home">
              <ATLogo />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-50 md:text-xl group-hover:text-indigo-300 transition-colors">
                  Aayush Tripathi
                </span>
                <div className="flex items-center gap-1.5 mt-[-2px]">
                  {/* Online Dot */}
                  <span className="relative flex h-2 w-2 hidden sm:flex">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  
                  {/* Desktop Status (Enhanced with Icons) */}
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400/90 hidden md:flex items-center gap-2">
                    <Briefcase className="h-3 w-3 text-sky-400/80" />
                    {opportunityStatus}
                    <span className="text-slate-500 mx-1">|</span>
                    <MapPin className="h-3 w-3 text-indigo-400/80" /> 
                    {locationStatus}
                  </span>
                  
                  {/* Mobile Status (Cinematic Title) */}
                  <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-indigo-400/90 md:hidden">
                    {DEVELOPER_TITLE}
                  </span>
                </div>
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden items-center md:flex" role="menubar">
              {/* Center nav links (Cinematic Hover) */}
              <nav className="flex items-center gap-1">
                
                {/* Holographic Button Component - Repeated for each link */}
                <NavLink to="/" className={getNavLinkClass} role="menuitem">
                    <motion.span 
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                    <Home className="h-4 w-4 z-10" /> 
                    <span className="z-10">Home</span>
                </NavLink>

                <NavLink to="/about" className={getNavLinkClass} role="menuitem">
                    <motion.span 
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                    <User className="h-4 w-4 z-10" /> 
                    <span className="z-10">About</span>
                </NavLink>

                <NavLink to="/work" className={getNavLinkClass} role="menuitem">
                    <motion.span 
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                    <Code className="h-4 w-4 z-10" /> 
                    <span className="z-10">Work</span>
                </NavLink>

                <NavLink to={RESUME_ROUTE} className={getNavLinkClass} role="menuitem">
                    <motion.span 
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                    <FileText className="h-4 w-4 z-10" /> 
                    <span className="z-10">Resume</span>
                </NavLink>

              </nav>

              {/* Right-side actions */}
              <div className="flex items-center gap-3 ml-2">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ICON_BUTTON_CLASS}
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ICON_BUTTON_CLASS}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>

                {/* Contact Button with Shimmer and Zap icon */}
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full 
                             border border-indigo-500/70 bg-indigo-600 px-5 py-2 text-sm font-semibold 
                             text-white shadow-[0_0_20px_rgba(79,70,229,0.7)] 
                             transition-all duration-200 hover:bg-indigo-500 hover:shadow-[0_0_26px_rgba(79,70,229,0.95)] 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  <Zap className="h-4 w-4"/>
                  <span>Contact</span>
                  {/* Shimmer effect */}
                  <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 mix-blend-screen transition-transform duration-700 group-hover:translate-x-[120%]" />
                </Link>
              </div>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex items-center rounded-md p-2 text-slate-100 transition-colors hover:bg-slate-800/70 md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
              aria-expanded={isOpen}
              aria-controls="mobile-menu-dropdown"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE DROPDOWN (Cinematic & Staggered) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="mobile-menu-dropdown"
            className="md:hidden border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-lg"
            variants={mobileDropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="menu"
          >
            <motion.div
              className="container mx-auto flex flex-col gap-1 px-4 py-4"
            >
              <motion.div variants={mobileLinkVariants}>
                <NavLink
                  to="/"
                  onClick={handleMobileNavClick}
                  className={getMobileLinkClass}
                  role="menuitem"
                >
                  <Home className="h-5 w-5"/> Home
                </NavLink>
              </motion.div>

              <motion.div variants={mobileLinkVariants}>
                <NavLink
                  to="/about"
                  onClick={handleMobileNavClick}
                  className={getMobileLinkClass}
                  role="menuitem"
                >
                  <User className="h-5 w-5"/> About Me
                </NavLink>
              </motion.div>

              <motion.div variants={mobileLinkVariants}>
                <NavLink
                  to="/work"
                  onClick={handleMobileNavClick}
                  className={getMobileLinkClass}
                  role="menuitem"
                >
                  <Code className="h-5 w-5"/> Work / Projects
                </NavLink>
              </motion.div>

              <motion.div variants={mobileLinkVariants}>
                <NavLink
                  to={RESUME_ROUTE}
                  onClick={handleMobileNavClick}
                  className={getMobileLinkClass}
                  role="menuitem"
                >
                  <FileText className="h-5 w-5"/> Resume
                </NavLink>
              </motion.div>

              {/* Separator and Actions */}
              <motion.div
                variants={mobileLinkVariants}
                className="pt-4 flex flex-col gap-4 border-t border-slate-800 mt-2"
              >
                <Link
                  to="/contact"
                  onClick={handleMobileNavClick}
                  className="flex items-center justify-center gap-3 w-full rounded-lg bg-indigo-600 px-3 py-3 text-base font-semibold text-white shadow-[0_0_18px_rgba(79,70,229,0.85)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_24px_rgba(79,70,229,1)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  <Zap className="h-5 w-5"/> Start a Conversation
                </Link>
                
                <div className="flex items-center justify-center gap-5">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 p-3 text-slate-200 transition-all hover:border-indigo-500 hover:text-indigo-300"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 p-3 text-slate-200 transition-all hover:border-indigo-500 hover:text-indigo-300"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </motion.div>

              <motion.p
                variants={mobileLinkVariants}
                className="pt-4 text-center text-[11px] uppercase tracking-[0.16em] text-slate-500/70"
              >
                {DEVELOPER_TITLE} Portfolio Interface
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;













// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Github, Linkedin } from "lucide-react";

// const RESUME_ROUTE = "/resume";

// // -------------------------
// // MINI AT LOGO (Animated SVG Monogram)
// // -------------------------
// const ATLogo = () => (
//   <motion.div
//     className="relative flex h-10 w-10 items-center justify-center 
//                rounded-full border border-indigo-500/70 bg-slate-950/90 
//                shadow-[0_0_18px_rgba(79,70,229,0.7)] overflow-hidden"
//     animate={{ scale: [1, 1.06, 1] }}
//     transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
//   >
//     {/* Outer glow */}
//     <div className="absolute inset-[-6px] rounded-full bg-gradient-to-tr from-indigo-500/40 via-sky-400/20 to-transparent opacity-70 blur-xl" />

//     {/* Inner circle with SVG mark */}
//     <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/95">
//       <svg
//         viewBox="0 0 32 32"
//         className="h-6 w-6 text-indigo-300 drop-shadow-[0_0_10px_rgba(129,140,248,0.9)]"
//       >
//         {/* Stylized A */}
//         <path
//           d="M8 22 L12 10 L16 22 Z"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <line
//           x1="10"
//           y1="17"
//           x2="14"
//           y2="17"
//           stroke="currentColor"
//           strokeWidth="1.4"
//           strokeLinecap="round"
//         />

//         {/* Stylized T */}
//         <line
//           x1="20"
//           y1="10"
//           x2="26"
//           y2="10"
//           stroke="currentColor"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//         />
//         <line
//           x1="23"
//           y1="10"
//           x2="23"
//           y2="22"
//           stroke="currentColor"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//         />
//       </svg>
//     </div>
//   </motion.div>
// );

// // -------------------------
// // ICONS (Hamburger & Close)
// // -------------------------
// const IconMenu = () => (
//   <svg
//     stroke="currentColor"
//     fill="none"
//     strokeWidth="2"
//     viewBox="0 0 24 24"
//     height="26px"
//     width="26px"
//   >
//     <line x1="3" y1="12" x2="21" y2="12"></line>
//     <line x1="3" y1="6" x2="21" y2="6"></line>
//     <line x1="3" y1="18" x2="21" y2="18"></line>
//   </svg>
// );

// const IconX = () => (
//   <svg
//     stroke="currentColor"
//     fill="none"
//     strokeWidth="2"
//     viewBox="0 0 24 24"
//     height="26px"
//     width="26px"
//   >
//     <line x1="18" y1="6" x2="6" y2="18"></line>
//     <line x1="6" y1="6" x2="18" y2="18"></line>
//   </svg>
// );

// // -------------------------
// // MOTION VARIANTS
// // -------------------------
// const navbarVariants = {
//   hidden: { y: -20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { duration: 0.4, ease: "easeOut" },
//   },
// };

// const mobileDropdownVariants = {
//   hidden: { opacity: 0, height: 0, y: -8 },
//   visible: {
//     opacity: 1,
//     height: "auto",
//     y: 0,
//     transition: { duration: 0.25, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     height: 0,
//     y: -8,
//     transition: { duration: 0.2, ease: "easeIn" },
//   },
// };

// const mobileLinkVariants = {
//   hidden: { opacity: 0, y: 8 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.25, ease: "easeOut" },
//   },
// };

// // -------------------------
// // NAVBAR COMPONENT
// // -------------------------
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const getNavLinkClass = ({ isActive }) =>
//     [
//       "relative px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-full",
//       "hover:text-indigo-300",
//       isActive
//         ? "bg-indigo-500/15 text-indigo-300 shadow-[0_0_18px_rgba(79,70,229,0.55)] border border-indigo-500/50"
//         : "text-slate-200 border border-transparent hover:border-indigo-500/40 hover:bg-slate-800/60",
//     ].join(" ");

//   const handleMobileNavClick = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* MAIN NAVBAR (DESKTOP + MOBILE BAR) */}
//       <motion.nav
//         className="z-40 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl 
//                 md:sticky md:top-0 md:left-0 md:right-0 fixed"
//         variants={navbarVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="relative">
//           {/* Glow line */}
//           <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-indigo-500/40 via-sky-400/40 to-transparent" />

//           <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-3.5">
//             {/* LEFT: Logo + Name */}
//             <Link to="/" className="flex items-center gap-3">
//               <ATLogo />
//               <div className="flex flex-col">
//                 <span className="text-base font-semibold tracking-tight text-slate-50 md:text-lg">
//                   Aayush Tripathi
//                 </span>
//                 <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:block">
//                   Full-Stack MERN Developer
//                 </span>
//                 {/* Added location and internship availability */}
//                 <span className="text-xs font-medium text-slate-400 sm:block">
//                   Available for internships · Ahmedabad, IN
//                 </span>
//               </div>
//             </Link>

//             {/* DESKTOP MENU */}
//             <div className="hidden items-center gap-6 md:flex">
//               {/* Center nav links */}
//               <div className="flex items-center gap-4">
//                 <NavLink to="/" className={getNavLinkClass}>
//                   Home
//                 </NavLink>
//                 <NavLink to="/about" className={getNavLinkClass}>
//                   About
//                 </NavLink>
//                 <NavLink to="/work" className={getNavLinkClass}>
//                   Work
//                 </NavLink>
//                 <NavLink to={RESUME_ROUTE} className={getNavLinkClass}>
//                   Resume
//                 </NavLink>
//               </div>

//               {/* Right-side actions */}
//               <div className="flex items-center gap-3">
//                 <a
//                   href="https://github.com/Aayush8113"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 p-2 text-slate-200 transition-all hover:border-indigo-500 hover:text-indigo-300 hover:shadow-[0_0_18px_rgba(79,70,229,0.7)]"
//                   aria-label="GitHub"
//                 >
//                   <Github className="h-4 w-4" />
//                 </a>
//                 <a
//                   href="https://linkedin.com/in/aayushtripathi081103"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 p-2 text-slate-200 transition-all hover:border-indigo-500 hover:text-indigo-300 hover:shadow-[0_0_18px_rgba(79,70,229,0.7)]"
//                   aria-label="LinkedIn"
//                 >
//                   <Linkedin className="h-4 w-4" />
//                 </a>

//                 <Link
//                   to="/contact"
//                   className="relative inline-flex items-center gap-2 overflow-hidden rounded-full 
//                              border border-indigo-500/70 bg-indigo-600 px-5 py-2 text-sm font-semibold 
//                              text-white shadow-[0_0_20px_rgba(79,70,229,0.7)] 
//                              transition-all duration-200 hover:bg-indigo-500 hover:shadow-[0_0_26px_rgba(79,70,229,0.95)]"
//                 >
//                   <span>Contact</span>
//                   <span className="text-[11px] text-indigo-200/80">
//                     Let&apos;s talk
//                   </span>
//                   <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 mix-blend-screen transition-transform duration-700 hover:translate-x-[120%]" />
//                 </Link>
//               </div>
//             </div>

//             {/* MOBILE MENU BUTTON */}
//             <button
//               onClick={() => setIsOpen((prev) => !prev)}
//               className="inline-flex items-center rounded-md p-2 text-slate-100 transition-colors hover:bg-slate-800/70 md:hidden"
//               aria-label="Toggle navigation menu"
//             >
//               {isOpen ? <IconX /> : <IconMenu />}
//             </button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* MOBILE DROPDOWN (under navbar) */}
//       <AnimatePresence initial={false}>
//         {isOpen && (
//           <motion.div
//             className="md:hidden border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl"
//             variants={mobileDropdownVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <motion.div
//               className="container mx-auto flex flex-col gap-3 px-4 py-4"
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.div variants={mobileLinkVariants}>
//                 <NavLink
//                   to="/"
//                   onClick={handleMobileNavClick}
//                   className="block rounded-lg px-3 py-2 text-base font-medium text-slate-100 hover:bg-slate-800/80 hover:text-indigo-300"
//                 >
//                   Home
//                 </NavLink>
//               </motion.div>

//               <motion.div variants={mobileLinkVariants}>
//                 <NavLink
//                   to="/about"
//                   onClick={handleMobileNavClick}
//                   className="block rounded-lg px-3 py-2 text-base font-medium text-slate-100 hover:bg-slate-800/80 hover:text-indigo-300"
//                 >
//                   About
//                 </NavLink>
//               </motion.div>

//               <motion.div variants={mobileLinkVariants}>
//                 <NavLink
//                   to="/work"
//                   onClick={handleMobileNavClick}
//                   className="block rounded-lg px-3 py-2 text-base font-medium text-slate-100 hover:bg-slate-800/80 hover:text-indigo-300"
//                 >
//                   Work
//                 </NavLink>
//               </motion.div>

//               <motion.div variants={mobileLinkVariants}>
//                 <NavLink
//                   to={RESUME_ROUTE}
//                   onClick={handleMobileNavClick}
//                   className="block rounded-lg px-3 py-2 text-base font-medium text-slate-100 hover:bg-slate-800/80 hover:text-indigo-300"
//                 >
//                   Resume
//                 </NavLink>
//               </motion.div>

//               <motion.div
//                 variants={mobileLinkVariants}
//                 className="pt-2 flex items-center justify-center gap-4"
//               >
//                 <a
//                   href="https://github.com/Aayush8113"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 p-2 text-slate-200 transition-all hover:border-indigo-500 hover:text-indigo-300"
//                   aria-label="GitHub"
//                 >
//                   <Github className="h-4 w-4" />
//                 </a>
//                 <a
//                   href="https://linkedin.com/in/aayushtripathi081103"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 p-2 text-slate-200 transition-all hover:border-indigo-500 hover:text-indigo-300"
//                   aria-label="LinkedIn"
//                 >
//                   <Linkedin className="h-4 w-4" />
//                 </a>
//               </motion.div>

//               <motion.div variants={mobileLinkVariants} className="pt-1">
//                 <Link
//                   to="/contact"
//                   onClick={handleMobileNavClick}
//                   className="block w-full rounded-lg bg-indigo-600 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-[0_0_18px_rgba(79,70,229,0.85)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_24px_rgba(79,70,229,1)]"
//                 >
//                   Contact Me
//                 </Link>
//               </motion.div>

//               <motion.p
//                 variants={mobileLinkVariants}
//                 className="pt-1 text-center text-[11px] uppercase tracking-[0.22em] text-slate-500"
//               >
//                 Full-Stack MERN Portfolio
//               </motion.p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;
