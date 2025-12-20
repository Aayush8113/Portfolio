// // /frontend/src/components/Preloader.jsx

// import React, { useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const ANIMATION_DURATION = 3000; // 3 seconds

// // Variants for overall overlay (fade out when removed)
// const overlayVariants = {
//   initial: { opacity: 1 },
//   exit: {
//     opacity: 0,
//     transition: { duration: 0.6, ease: "easeInOut" },
//   },
// };

// // Variants for the circular logo container
// const logoVariants = {
//   initial: { scale: 0.8, opacity: 0, rotate: -6 },
//   animate: {
//     scale: 1,
//     opacity: 1,
//     rotate: 0,
//     transition: {
//       duration: 0.9,
//       ease: [0.16, 1, 0.3, 1],
//     },
//   },
// };

// // Staggered animation for letters in "PORTFOLIO"
// const lettersContainer = {
//   initial: {},
//   animate: {
//     transition: {
//       staggerChildren: 0.07,
//       delayChildren: 0.3,
//     },
//   },
// };

// const letterVariant = {
//   initial: { opacity: 0, y: 24, scale: 0.8 },
//   animate: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.4,
//       ease: "easeOut",
//     },
//   },
// };

// const Preloader = ({ onAnimationComplete }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onAnimationComplete && onAnimationComplete();
//     }, ANIMATION_DURATION);

//     return () => clearTimeout(timer);
//   }, [onAnimationComplete]);

//   const letters = ["P", "O", "R", "T", "F", "O", "L", "I", "O"];

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617]"
//         variants={overlayVariants}
//         initial="initial"
//         animate="initial"
//         exit="exit"
//       >
//         <motion.div
//           className="flex flex-col items-center gap-8"
//           initial="initial"
//           animate="animate"
//         >
//           {/* PULSING CIRCLE LOGO */}
//           <motion.div
//             variants={logoVariants}
//             className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-900/80 border border-indigo-500/40 shadow-[0_0_40px_rgba(79,70,229,0.4)] flex items-center justify-center overflow-hidden"
//           >
//             {/* Outer pulsing rings */}
//             <motion.div
//               className="absolute inset-[-12px] rounded-full border border-indigo-500/30"
//               animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.1, 1] }}
//               transition={{
//                 duration: 1.8,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//             <motion.div
//               className="absolute inset-[-24px] rounded-full border border-cyan-400/10"
//               animate={{ opacity: [0.1, 0.5, 0.1], scale: [1.05, 1.18, 1.05] }}
//               transition={{
//                 duration: 2.4,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />

//             {/* Diagonal gradient strip behind initials */}
//             <div className="absolute -inset-10 rotate-12 bg-gradient-to-r from-indigo-500/40 via-sky-400/30 to-emerald-400/30 blur-xl" />

//             {/* Inner circle with initials */}
//             <div className="relative flex flex-col items-center justify-center gap-1">
//               <span className="text-3xl md:text-4xl font-black tracking-[0.15em] text-slate-50 drop-shadow-[0_0_12px_rgba(15,23,42,0.9)]">
//                 AT
//               </span>
//               <span className="text-[0.6rem] md:text-xs uppercase tracking-[0.22em] text-indigo-300/90">
//                 Full-Stack Dev
//               </span>
//             </div>

//             {/* Small orbiting dot */}
//             <motion.div
//               className="absolute w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]"
//               style={{ top: "10%", right: "8%" }}
//               animate={{
//                 y: [0, -6, 0],
//                 x: [0, 4, 0],
//               }}
//               transition={{
//                 duration: 1.4,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           </motion.div>

//           {/* "PORTFOLIO" TEXT + TAGLINES */}
//           <motion.div
//             className="flex flex-col items-center gap-3"
//             variants={lettersContainer}
//           >
//             {/* Letters */}
//             <motion.div
//               className="flex text-3xl md:text-4xl font-semibold tracking-[0.35em] text-indigo-100 uppercase"
//             >
//               {letters.map((letter, index) => (
//                 <motion.span
//                   key={index}
//                   variants={letterVariant}
//                   className="mx-[0.09em] drop-shadow-[0_0_16px_rgba(129,140,248,0.45)]"
//                 >
//                   {letter}
//                 </motion.span>
//               ))}
//             </motion.div>

//             {/* Sub text */}
//             <motion.p
//               className="text-xs md:text-sm text-slate-400/90 tracking-[0.25em] uppercase"
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 0.5 }}
//             >
//               Crafting clean, modern MERN experiences
//             </motion.p>
//           </motion.div>

//           {/* ANIMATED PROGRESS BAR */}
//           <motion.div
//             className="w-48 md:w-64 h-1.5 rounded-full bg-slate-800 overflow-hidden shadow-inner"
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.4 }}
//           >
//             <motion.div
//               className="w-1/2 h-full bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300"
//               animate={{ x: ["-100%", "100%"] }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 1.4,
//                 ease: "easeInOut",
//               }}
//             />
//           </motion.div>

//           {/* SMALL FOOTER TEXT */}
//           <motion.span
//             className="text-[0.65rem] md:text-xs text-slate-500/80 tracking-[0.2em] uppercase"
//             initial={{ opacity: 0, y: 6 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1, duration: 0.4 }}
//           >
//             Loading your experience…
//           </motion.span>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default Preloader;



















// // /frontend/src/components/Preloader.jsx (Premium Timing and Look)

// import React, { useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- Configuration ---
// // Total time the preloader is on screen (increased for premium feel)
// const ANIMATION_DURATION = 4500; // 4.5 seconds 
// const EXIT_DURATION = 0.7; // Smoother, longer exit transition

// // 1. OVERLAY/EXIT VARIANTS
// const overlayVariants = {
//   initial: { opacity: 1 },
//   exit: {
//     opacity: 0,
//     // Start exit transition 0.7 seconds before the total duration ends (4.5s - 0.7s = 3.8s)
//     transition: { 
//         duration: EXIT_DURATION, 
//         ease: "easeInOut", 
//         delay: ANIMATION_DURATION / 1000 - EXIT_DURATION 
//     },
//   },
// };

// // 2. SHAPE ASSEMBLY VARIANTS (The "Assembly Logo")
// const shapeAssemblyVariants = {
//   // Start state (off-center, rotated, transparent)
//   initial: (i) => ({ 
//     opacity: 0, 
//     x: i === 0 ? -40 : i === 1 ? 40 : 0, 
//     y: i === 0 ? -40 : i === 1 ? -40 : 40,
//     rotate: -180,
//     scale: 0.8
//   }),
//   // Assembly state (settles at the center)
//   animate: (i) => ({
//     opacity: 1, 
//     x: 0, 
//     y: 0,
//     rotate: 0,
//     scale: 1,
//     transition: {
//       duration: 1.2, // Slower assembly for deliberate feel
//       ease: [0.4, 0, 0.2, 1],
//       delay: 0.2 + (0.15 * i), // Slight initial delay + staggered start
//     }
//   }),
//   // Exit state (fades out with the screen)
//   exit: {
//     opacity: 0, 
//     scale: 1.1,
//     transition: {
//         duration: 0.5,
//     }
//   }
// };

// // 3. TEXT VARIANTS
// const lettersContainer = {
//   animate: {
//     transition: {
//       staggerChildren: 0.08, // Slower stagger
//       delayChildren: 1.6, // Significant delay: starts after shapes have fully settled (t=1.4s)
//     },
//   },
// };

// const letterVariant = {
//   initial: { opacity: 0, y: 16, scale: 0.9 },
//   animate: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.4,
//       ease: "easeOut",
//     },
//   },
// };

// const Preloader = ({ onAnimationComplete }) => {
//   useEffect(() => {
//     // This timer guarantees the component unmounts after the TOTAL duration
//     const timer = setTimeout(() => {
//       onAnimationComplete && onAnimationComplete();
//     }, ANIMATION_DURATION);

//     return () => clearTimeout(timer);
//   }, [onAnimationComplete]);

//   const letters = ["P", "O", "R", "T", "F", "O", "L", "I", "O"];
//   const shapes = [
//     { id: 0, class: "w-12 h-12 bg-primary-400 shadow-lg shadow-primary-500/50" }, 
//     { id: 1, class: "w-0 h-0 border-l-[30px] border-l-transparent border-b-[60px] border-b-red-500 border-r-[30px] border-r-transparent shadow-lg shadow-red-500/50" }, 
//     { id: 2, class: "w-14 h-14 rounded-full bg-indigo-400 shadow-lg shadow-indigo-500/50" } 
//   ];

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] overflow-hidden"
//         variants={overlayVariants}
//         initial="initial"
//         animate="initial" 
//         exit="exit"
//       >
//         <motion.div
//           className="flex flex-col items-center gap-8"
//         >
//           {/* 1. ASSEMBLY LOGO CONTAINER: Shapes Assemble Here */}
//           <div className="relative w-40 h-40">
//             {shapes.map((shape, index) => (
//               <motion.div
//                 key={shape.id}
//                 className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center ${shape.class}`}
//                 variants={shapeAssemblyVariants}
//                 custom={index}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               />
//             ))}
//           </div>

//           {/* 2. "PORTFOLIO" TEXT + TAGLINES */}
//           <motion.div
//             className="flex flex-col items-center gap-3"
//             variants={lettersContainer}
//             initial="initial"
//             animate="animate"
//           >
//             {/* Letters (Staggered Entry) */}
//             <motion.div
//               className="flex text-3xl md:text-4xl font-semibold tracking-[0.35em] text-indigo-100 uppercase"
//             >
//               {letters.map((letter, index) => (
//                 <motion.span
//                   key={index}
//                   variants={letterVariant}
//                   className="mx-[0.09em] drop-shadow-[0_0_16px_rgba(129,140,248,0.45)]"
//                 >
//                   {letter}
//                 </motion.span>
//               ))}
//             </motion.div>

//             {/* Sub text (Delayed Entry) */}
//             <motion.p
//               className="text-xs md:text-sm text-slate-400/90 tracking-[0.25em] uppercase"
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 2.0, duration: 0.5 }} // Starts after letter staggering finishes
//             >
//               Crafting clean, modern MERN experiences
//             </motion.p>
//           </motion.div>

//           {/* 3. ANIMATED PROGRESS BAR */}
//           <motion.div
//             className="w-48 md:w-64 h-1.5 rounded-full bg-slate-800 overflow-hidden shadow-inner"
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.0, duration: 0.4 }} // Starts while shapes are settling
//           >
//             <motion.div
//               className="w-1/2 h-full bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300"
//               animate={{ x: ["-100%", "100%"] }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 1.5, // Slower swipe
//                 ease: "linear",
//               }}
//             />
//           </motion.div>

//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default Preloader;





















// /frontend/src/components/Preloader.jsx

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ANIMATION_DURATION = 3400; // ~3.4 seconds

// Full-screen overlay fade out
const overlayVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// Editor card animation
const cardVariants = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Stack chips animation
const chipVariant = {
  initial: { opacity: 0, y: 10 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.45 + i * 0.12,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

// PORTFOLIO letters container
const lettersContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.6 },
  },
};

const letterVariant = {
  initial: { opacity: 0, y: 16, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const Preloader = ({ onAnimationComplete }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Loading Advanced MERN Todo Manager…",
    "Preparing E-Shop Admin Panel & dashboards…",
    "Connecting MongoDB & API endpoints…",
    "Syncing portfolio projects & case studies…",
    "Configuring contact form & Nodemailer…",
  ];

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) =>
        prev + 1 < messages.length ? prev + 1 : prev
      );
    }, 700);

    const timer = setTimeout(() => {
      onAnimationComplete && onAnimationComplete();
    }, ANIMATION_DURATION);

    return () => {
      clearInterval(msgInterval);
      clearTimeout(timer);
    };
  }, [onAnimationComplete]);

  const letters = ["P", "O", "R", "T", "F", "O", "L", "I", "O"];
  const chips = [
    "Frontend (React + Tailwind)",
    "Backend (Node / Express)",
    "Database (MongoDB)",
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed inset-0 z-[9999]
          bg-[#020617]
          flex items-center justify-center
          h-screen
          px-4
        "
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Centered wrapper */}
        <motion.div
          className="flex flex-col items-center justify-center w-full max-w-md gap-4 sm:gap-5 lg:max-w-3xl lg:gap-5 xl:max-w-4xl"
          initial="initial"
          animate="animate"
        >
          {/* --- LOGO SECTION --- */}
          <motion.div
            className="flex flex-col items-center justify-center mb-1"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="relative flex items-center justify-center mb-1"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute w-20 h-20 rounded-full sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-30 xl:h-30 bg-gradient-to-tr from-indigo-500/30 via-sky-400/20 to-cyan-300/20 blur-xl opacity-60"
              />
              <motion.div
                className="absolute w-16 h-16 border-2 rounded-full sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-26 xl:h-26 border-indigo-400/40"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Main circle logo */}
            <motion.div
              className="
                relative 
                w-14 h-14 
                sm:w-18 sm:h-18
                lg:w-20 lg:h-20
                xl:w-22 xl:h-22
                rounded-full bg-slate-900/95
                border border-indigo-500/60 
                shadow-[0_0_30px_rgba(79,70,229,0.7)]
                flex items-center justify-center 
                overflow-hidden
              "
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Reflection */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/25 via-sky-400/10 to-transparent"
              />

              {/* "AT" → "<AT/>" morph */}
              <motion.span
                className="
                  absolute 
                  text-base sm:text-lg lg:text-xl
                  font-bold tracking-[0.20em] 
                  text-slate-50 uppercase
                "
                initial={{ opacity: 1, y: 4 }}
                animate={{ opacity: [1, 1, 0], y: [4, 4, -4] }}
                transition={{
                  duration: 1.6,
                  ease: "easeInOut",
                  delay: 0,
                }}
              >
                AT
              </motion.span>

              <motion.span
                className="
                  absolute 
                  text-sm sm:text-base lg:text-lg
                  font-bold tracking-[0.15em] 
                  text-indigo-300 
                  drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]
                "
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0, 0, 1], y: [8, 8, 0] }}
                transition={{
                  duration: 1.8,
                  ease: "easeOut",
                  delay: 1.1,
                }}
              >
                &lt;AT/&gt;
              </motion.span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="
                mt-2 
                text-[0.6rem] sm:text-[0.7rem]
                lg:text-sm
                text-slate-400 
                tracking-[0.22em] sm:tracking-[0.26em] 
                uppercase text-center
              "
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              Full Stack MERN Developer
            </motion.p>

            {/* Underline */}
            <motion.div
              className="
                mt-1 h-0.5 rounded-full 
                bg-gradient-to-r 
                from-indigo-500 via-sky-400 to-cyan-300
              "
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "60%", opacity: 1 }}
              transition={{
                delay: 0.9,
                duration: 0.6,
                ease: "easeOut",
              }}
            />
          </motion.div>

          {/* --- EDITOR CARD --- */}
          <motion.div
            variants={cardVariants}
            className="
              relative 
              w-full 
              max-w-[340px]
              sm:max-w-[380px]
              lg:max-w-[540px]
              xl:max-w-[600px]
              rounded-2xl 
              bg-slate-900/95 
              border border-slate-700/70 
              shadow-[0_18px_45px_rgba(15,23,42,0.9)] 
              overflow-hidden
            "
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/70 bg-slate-900/90">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-[0.6rem] sm:text-[0.7rem] lg:text-xs text-slate-400 font-mono truncate">
                fullstack-portfolio.jsx
              </span>
              <span className="text-[0.6rem] sm:text-[0.65rem] lg:text-xs text-indigo-300 font-mono">
                MERN
              </span>
            </div>

            {/* Code content */}
            <div className="px-4 py-3 font-mono text-[0.65rem] sm:text-[0.7rem] lg:text-[0.8rem] text-slate-200 space-y-1.5">
              <p className="text-slate-500">
                <span className="text-sky-400">
                  {"// Aayush Tripathi — MERN Full Stack Developer"}
                </span>
              </p>
              <p>
                <span className="text-violet-400">const</span>{" "}
                <span className="text-emerald-300">stack</span> ={" "}
                <span className="text-sky-300">
                  ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"]
                </span>
                ;
              </p>
              <p>
                <span className="text-violet-400">const</span>{" "}
                <span className="text-emerald-300">focusAreas</span> ={" "}
                <span className="text-amber-300">
                  ["High-performance UIs", "Clean APIs", "Scalable dashboards"]
                </span>
                ;
              </p>
              <p className="pt-1">
                <span className="text-violet-400">const</span>{" "}
                <span className="text-emerald-300">projects</span> ={" "}
                <span className="text-sky-300">
                  [
                  "Advanced MERN Todo Manager",
                  "E-Shop Admin Panel",
                  "Developer Portfolio"
                  ]
                </span>
                ;
              </p>
              <p className="pt-1">
                <span className="text-violet-400">function</span>{" "}
                <span className="text-sky-300">buildExperience</span>
                <span className="text-slate-300">()</span> {"{"}
              </p>
              <p className="pl-4">
                <span className="text-sky-300">return</span>{" "}
                <span className="text-emerald-300">
                  {"<ModernMERNPortfolio />"}
                </span>
                ;
              </p>
              <p>{"}"}</p>

              {/* Live dev-log message */}
              <motion.p
                key={messageIndex}
                className="pt-2 text-[0.6rem] sm:text-[0.7rem] lg:text-xs text-slate-400 flex items-center gap-2"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {messages[messageIndex]}
              </motion.p>
            </div>
          </motion.div>

          {/* --- STACK CHIPS (ALL DEVICES) --- */}
          <div
            className="flex flex-wrap items-center justify-center max-w-xs gap-2 mt-2 sm:gap-3 lg:gap-4 sm:max-w-md lg:max-w-2xl"
          >
            {chips.map((chip, index) => (
              <motion.div
                key={chip}
                custom={index}
                variants={chipVariant}
                initial="initial"
                animate="animate"
                className="
                  px-3 py-1.5 
                  rounded-full 
                  bg-slate-900/80 
                  border border-slate-700/80 
                  text-[0.6rem] sm:text-[0.7rem] lg:text-[0.8rem]
                  uppercase tracking-[0.14em] sm:tracking-[0.16em]
                  text-slate-200 
                  flex items-center gap-1.5
                "
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                {chip}
              </motion.div>
            ))}
          </div>

          {/* --- PORTFOLIO word (PC only) --- */}
          <motion.div
            className="
              hidden lg:flex
              justify-center 
              text-2xl lg:text-2xl xl:text-3xl
              font-semibold 
              tracking-[0.32em] 
              text-indigo-100 
              uppercase
            "
            variants={lettersContainer}
            initial="initial"
            animate="animate"
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariant}
                className="mx-[0.12em]"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* --- PROGRESS BAR --- */}
          <motion.div
            className="
              w-full 
              max-w-[200px] sm:max-w-[240px] 
              h-1.5 
              rounded-full 
              bg-slate-800 
              overflow-hidden 
              shadow-inner
            "
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <motion.div
              className="w-1/2 h-full bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-300"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* --- FOOTER TEXT --- */}
          <motion.span
            className="
              text-[0.6rem] sm:text-[0.7rem]
              lg:text-[0.8rem]
              text-slate-500/85 
              uppercase tracking-[0.18em] sm:tracking-[0.22em]
            "
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.3 }}
          >
            Preparing your full-stack experience…
          </motion.span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;





























// // /frontend/src/components/Preloader.jsx (God-Tier V6: Individual AT Letter Animation)

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- Configuration ---
// const ANIMATION_DURATION = 5000; // Total time (5.0 seconds)
// const MORPH_TRIGGER_TIME = 3000; // AT morphs to </> at 3.0 seconds
// const EXIT_SHUTTER_DELAY = 4200; // Shutter starts closing at 4.2 seconds
// const EXIT_SHUTTER_DURATION = 0.8; // Shutter movement duration

// // 1. OVERLAY VARIANTS
// const overlayVariants = {
//     initial: { opacity: 1 },
//     exit: { opacity: 0, transition: { duration: 0.1, delay: ANIMATION_DURATION / 1000 } }, 
// };

// // 2. LOGO CONTAINER VARIANTS (Hyper-tuned Entrance)
// const logoVariants = {
//     initial: { opacity: 0, y: 30, rotateX: 15, rotateY: -25, scale: 0.75, filter: "blur(6px)" }, 
//     animate: {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         rotateX: 0,
//         rotateY: 0,
//         filter: "blur(0px)",
//         transition: {
//             duration: 1.4, // SLOWER, HEAVIER ARRIVAL
//             ease: [0.16, 1, 0.3, 1],
//             delay: 0.1, 
//         },
//     },
// };

// // 3. AT LETTER ANIMATION (New Staggered Flip for 'A' and 'T')
// const AT_LettersContainerVariants = {
//     initial: {},
//     animate: {
//         transition: {
//             staggerChildren: 0.1, // Stagger A then T
//             delayChildren: 1.0, // Fires after the outer logo container is settled
//         }
//     },
//     exit: { 
//         opacity: 0, 
//         y: -10, 
//         scale: 0.8,
//         transition: { duration: 0.4, ease: "easeOut" } 
//     }
// }

// const AT_LetterVariant = {
//     initial: { opacity: 0, y: 15, rotateX: 90 },
//     animate: {
//         opacity: 1,
//         y: 0,
//         rotateX: 0,
//         transition: {
//             duration: 0.6,
//             ease: [0.2, 0.7, 0.4, 1.2], // Custom ease for a slight pop/spring
//         }
//     }
// }

// // 4. PORTFOLIO Letter Animation
// const letterVariant = {
//     initial: { opacity: 0, y: 20, scale: 0.8, rotateX: 90 },
//     animate: {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         rotateX: 0,
//         transition: { duration: 0.45, ease: "easeOut" },
//     },
// };

// // 5. Particle explosion (Unchanged)
// const particleVariant = {
//     initial: { opacity: 0, scale: 0, x: 0, y: 0 },
//     animate: {
//         opacity: [0.5, 1, 0.5], 
//         scale: 1,
//         transition: { duration: 0.4, ease: "easeOut" },
//     },
//     exit: (i) => {
//         const angle = (i / 10) * Math.PI * 2;
//         const distance = 80 + i * 15;
//         return {
//             x: Math.cos(angle) * distance,
//             y: Math.sin(angle) * distance,
//             opacity: 0,
//             scale: 0.4,
//             transition: { duration: 0.7, ease: "easeInOut", delay: 0.1 },
//         };
//     },
// };

// // -------------------------------------------------------------------------
// // DIGITAL SHUTTER (Unchanged)
// // -------------------------------------------------------------------------
// const ShutterOverlay = () => {
//     const shutterVariants = {
//         closed: { opacity: 1, y: 0 },
//         open: { 
//             opacity: 0, 
//             y: '-100%', 
//             transition: { 
//                 duration: EXIT_SHUTTER_DURATION, 
//                 ease: [0.76, 0.0, 0.24, 1.0], 
//             }
//         }
//     };

//     return (
//         <motion.div
//             className="fixed inset-0 z-[10000] bg-slate-950" 
//             variants={shutterVariants}
//             initial="closed"
//             animate="open"
//         />
//     );
// };
// // -------------------------------------------------------------------------


// const Preloader = ({ onAnimationComplete }) => {
//     const [isMorphed, setIsMorphed] = useState(false);
//     const [showShutter, setShowShutter] = useState(false);

//     useEffect(() => {
//         const morphTimeout = setTimeout(() => {
//             setIsMorphed(true);
//         }, MORPH_TRIGGER_TIME);

//         const shutterTimer = setTimeout(() => {
//             setShowShutter(true);
//         }, EXIT_SHUTTER_DELAY);

//         const finalTimer = setTimeout(() => {
//             onAnimationComplete && onAnimationComplete();
//         }, ANIMATION_DURATION);

//         return () => {
//             clearTimeout(morphTimeout);
//             clearTimeout(shutterTimer);
//             clearTimeout(finalTimer);
//         };
//     }, [onAnimationComplete]);

//     const letters = ["P", "O", "R", "T", "F", "O", "L", "I", "O"];
//     const initials = ["A", "T"];
//     const particles = Array.from({ length: 12 });

//     return (
//         <AnimatePresence>
//             <motion.div
//                 className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950"
//                 variants={overlayVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//             >
//                 {/* Warp-speed tunnel background */}
//                 <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                     <motion.div
//                         className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,#1e293b_0%,#020617_55%,#000_100%)]"
//                         style={{ width: 800, height: 800 }}
//                         animate={{
//                             scale: [1, 1.15, 1],
//                             opacity: [0.6, 0.9, 0.6],
//                         }}
//                         transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
//                     />
//                 </div>

//                 {/* Main content */}
//                 <motion.div
//                     className="relative flex flex-col items-center gap-10"
//                 >
//                     {/* Orbiting particles that explode out on morph */}
//                     <AnimatePresence>
//                         {!isMorphed && (
//                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                                 {particles.map((_, i) => (
//                                     <motion.span
//                                         key={i}
//                                         custom={i}
//                                         variants={particleVariant}
//                                         initial="initial"
//                                         animate="animate"
//                                         exit="exit"
//                                         transition={{ delay: 1.0 + i * 0.1 }}
//                                         className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent-300/90 shadow-[0_0_18px_rgba(34,211,238,1)]"
//                                     />
//                                 ))}
//                             </div>
//                         )}
//                     </AnimatePresence>


//                     {/* MAIN LOGO CONTAINER */}
//                     <motion.div
//                         variants={logoVariants}
//                         className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-slate-900/85 border border-brand-500/40 shadow-[0_0_50px_rgba(79,70,229,0.65)] flex items-center justify-center overflow-hidden backdrop-blur-xl"
//                     >
//                         {/* Shimmer beam across logo */}
//                         <motion.div
//                             className="absolute inset-0 bg-gradient-to-r from-transparent via-white/22 to-transparent"
//                             animate={{ x: ["-120%", "120%"] }}
//                             transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
//                             style={{ transform: "skewX(-20deg)" }}
//                         />

//                         {/* LOGO CONTENT: AT morphs to </> */}
//                         <AnimatePresence mode="wait" initial={false}>
//                             {!isMorphed ? (
//                                 // STATE 1: AT Initials (Staggered Flip)
//                                 <motion.div
//                                     key="initial-logo"
//                                     variants={AT_LettersContainerVariants}
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     className="relative flex flex-col items-center gap-1"
//                                 >
//                                     <div className="flex text-4xl md:text-5xl font-black tracking-[0.18em] text-slate-50 drop-shadow-[0_0_14px_rgba(15,23,42,0.95)] perspective-1000">
//                                         {initials.map((initial, index) => (
//                                             <motion.span
//                                                 key={index}
//                                                 variants={AT_LetterVariant}
//                                                 className="inline-block mx-0.5"
//                                             >
//                                                 {initial}
//                                             </motion.span>
//                                         ))}
//                                     </div>
//                                     <motion.span 
//                                         className="text-[0.55rem] md:text-xs uppercase tracking-[0.32em] text-brand-200/90"
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ duration: 0.5, delay: 1.6 }} // Settle text after letters flip
//                                     >
//                                         FULL-STACK DEV
//                                     </motion.span>
//                                 </motion.div>
//                             ) : (
//                                 // STATE 2: </> (Code Symbol)
//                                 <motion.div
//                                     key="morphed-logo"
//                                     initial={{ opacity: 0, y: 10, scale: 0.8, rotateX: 20 }}
//                                     animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
//                                     exit={{ opacity: 0, y: -12, scale: 0.85 }}
//                                     transition={{ duration: 0.45, ease: "easeOut" }}
//                                     className="relative flex flex-col items-center gap-1"
//                                 >
//                                     <motion.span
//                                         className="text-3xl md:text-4xl font-black text-slate-50 tracking-[0.3em] drop-shadow-[0_0_18px_rgba(56,189,248,0.8)]"
//                                         animate={{ scale: [1, 1.08, 1], letterSpacing: ["0.3em", "0.4em", "0.3em"], }}
//                                         transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
//                                     >
//                                         {"</>"}
//                                     </motion.span>
//                                     <span className="text-[0.55rem] md:text-xs uppercase tracking-[0.32em] text-accent-200/90">
//                                         MERN Portfolio
//                                     </span>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </motion.div>

//                     {/* "PORTFOLIO" TEXT */}
//                     <motion.div
//                         className="flex text-3xl md:text-4xl font-semibold tracking-[0.35em] text-brand-100 uppercase"
//                         animate={{ transition: { staggerChildren: 0.08, delayChildren: 1.8 }, }}
//                     >
//                         {letters.map((letter, i) => (
//                             <motion.span
//                                 key={i}
//                                 variants={letterVariant}
//                                 className="mx-[0.12em] drop-shadow-[0_0_18px_rgba(129,140,248,0.5)]"
//                             >
//                                 {letter}
//                             </motion.span>
//                         ))}
//                     </motion.div>

//                     {/* GEL PROGRESS BAR */}
//                     <motion.div
//                         className="w-56 h-2 overflow-hidden rounded-full shadow-inner md:w-72 bg-slate-800/80"
//                         initial={{ opacity: 0, y: 8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 1.5 }}
//                     >
//                         <motion.div
//                             className="h-full rounded-full bg-gradient-to-r from-brand-400 via-accent-400 to-cyan-300"
//                             animate={{ x: ["-120%", "120%"] }}
//                             transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
//                         />
//                     </motion.div>

//                     {/* FOOTER TEXT */}
//                     <motion.span
//                         className="text-[0.7rem] md:text-xs text-slate-500/85 uppercase tracking-[0.25em]"
//                         initial={{ opacity: 0, y: 6 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 2.0 }}
//                     >
//                         Initializing Core Systems...
//                     </motion.span>
//                 </motion.div>
//             </motion.div>

//             {/* FINAL STEP: The Digital Shutter closes over the animation and retreats, revealing the app */}
//             <AnimatePresence>
//                 {showShutter && <ShutterOverlay />}
//             </AnimatePresence>
//         </AnimatePresence>
//     );
// };

// export default Preloader;