import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Zap, Code2, Handshake, Rocket } from "lucide-react";

// ------------------
// ANIMATION VARIANTS
// ------------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ------------------
// INTRO BLOCK COMPONENT
// ------------------
const IntroBlock = ({ className }) => (
  <motion.div variants={itemVariants} className={`text-center mx-auto space-y-4 ${className}`}>

    <h2 className="text-lg sm:text-xl font-bold flex justify-center items-center gap-2">
      <Zap className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
      I build high-performance MERN applications
    </h2>

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
      <Code2 className="inline w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-1" />
      blending exceptional design with
      <span className="text-white font-semibold"> scalability, speed, </span>
      and <span className="text-white font-semibold"> precision.</span>
    </p>

    <p className="text-gray-400 text-base sm:text-lg pt-2">
      <Handshake className="inline w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-1" />
      Partner with me to create a product that
      <span className="text-white font-semibold"> performs, impresses, </span>
      and <span className="text-white font-semibold"> lasts.</span>
      <Rocket className="inline w-4 h-4 sm:w-5 sm:h-5 text-red-400 ml-1" />
    </p>
  </motion.div>
);

// ------------------
// HERO COMPONENT
// ------------------
const Hero = () => {
  const [text] = useTypewriter({
    words: [
      "a Full-Stack Architect.",
      "a React Specialist.",
      "a Scalable Backend Designer.",
      "a Solution-Oriented Partner.",
    ],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1800,
  });

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4 bg-[#020617]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center max-w-4xl"
      >

        {/* -------------------------------------------------- */}
        {/* 🔥 1. CINEMATIC AT LOGO BADGE (Preloader Matching) */}
        {/* -------------------------------------------------- */}
        <motion.div className="flex flex-col items-center mb-8" variants={itemVariants}>
          {/* Glow ring */}
          <motion.div
            className="relative flex items-center justify-center"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute w-32 h-32 rounded-full 
                            bg-gradient-to-tr from-indigo-500/30 via-sky-400/20 to-cyan-300/20 
                            blur-xl opacity-60" />
            <motion.div
              className="absolute w-28 h-28 rounded-full border-[1.5px] border-indigo-400/40"
              animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Main AT circle */}
          <motion.div
            className="relative w-24 h-24 rounded-full bg-slate-900/95
                       border border-indigo-500/60 shadow-[0_0_32px_rgba(79,70,229,0.7)]
                       flex items-center justify-center overflow-hidden mt-2"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br 
                            from-indigo-500/25 via-sky-400/10 to-transparent" />

            {/* AT morph */}
            <motion.span
              className="absolute text-2xl font-bold tracking-[0.20em] text-slate-50 uppercase"
              initial={{ opacity: 1, y: 4 }}
              animate={{ opacity: [1, 1, 0], y: [4, 4, -4] }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            >
              AT
            </motion.span>

            <motion.span
              className="absolute text-xl font-bold tracking-[0.15em] 
                         text-indigo-300 drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0, 0, 1], y: [8, 8, 0] }}
              transition={{ duration: 1.8, delay: 1, ease: "easeOut" }}
            >
              &lt;AT/&gt;
            </motion.span>
          </motion.div>
        </motion.div>

        {/* -------------------------- */}
        {/* 🔥 2. NAME / TYPEWRITER TEXT */}
        {/* -------------------------- */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-50 mb-4"
        >
          Hi, I'm <span className="text-blue-400">Aayush Tripathi</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-medium 
                     min-h-[2.5rem] sm:min-h-[3rem] mb-8"
        >
          I'm {text}
          <Cursor cursorStyle="|" cursorColor="#60a5fa" />
        </motion.p>

        {/* -------------------------- */}
        {/* 🔥 3. INTRO BLOCK */}
        {/* -------------------------- */}
        <IntroBlock className="mb-8" />

        {/* -------------------------- */}
        {/* 🔥 4. CTA BUTTONS */}
        {/* -------------------------- */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4"
        >
          <Link
            to="/work"
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-xl 
                       hover:bg-blue-700 transition-transform hover:scale-[1.02] active:scale-95"
          >
            View My Work
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-xl 
                       hover:bg-gray-600 transition-transform hover:scale-[1.02] active:scale-95"
          >
            Start a Project
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
