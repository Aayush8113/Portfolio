import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Github, Mail, Code } from "lucide-react"; 
import { motion } from "framer-motion";

// --- Configuration Constants (Synced with Navbar) ---
const GITHUB_URL = "https://https://github.com/Aayush8113";
const LINKEDIN_URL = "https://linkedin.com/in/aayushtripathi081103";
const EMAIL = "mailto:aayushtripathi.tech@gmail.com";
const CURRENT_YEAR = new Date().getFullYear();

// -----------------------
// AT BADGE (Fixed Animation Trigger - Runs once when visible)
// -----------------------
const ATBadge = () => (
    <motion.div
        className="relative w-12 h-12 rounded-full bg-slate-950/80 border border-indigo-500/60 shadow-[0_0_18px_rgba(79,70,229,0.7)] flex items-center justify-center overflow-hidden"
        initial={{ scale: 0.95 }}
        whileInView={{ scale: [0.95, 1.05, 1] }} // Triggered when scrolled into view
        viewport={{ once: true, amount: 0.8 }} // Run only once, when 80% visible
        transition={{ duration: 1.8, ease: "easeInOut" }}
    >
        <motion.span
            className="absolute text-[14px] font-bold tracking-[0.18em] text-slate-50 uppercase"
            initial={{ opacity: 1, y: 0 }}
            whileInView={{
                opacity: [1, 1, 0],
                y: [0, 0, -6],
            }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
                duration: 1.6,
                times: [0, 0.6, 1],
                ease: "easeInOut",
            }}
        >
            AT
        </motion.span>

        <motion.span
            className="absolute text-[12px] font-bold tracking-[0.15em] text-indigo-300 drop-shadow-[0_0_5px_rgba(99,102,241,0.8)]"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{
                opacity: [0, 1, 1],
                y: [6, 0, 0],
            }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
                duration: 1.6,
                delay: 0.8,
                times: [0, 0.4, 1],
                ease: "easeOut",
            }}
        >
            &lt;AT/&gt;
        </motion.span>
    </motion.div>
);

// -----------------------
// SOCIAL ICON BUTTONS (Cinematic Hover)
// -----------------------
const SocialIcon = ({ href, children, label }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="text-slate-400 hover:text-sky-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.9)] rounded-full p-2"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
    >
        {children}
    </motion.a>
);

// -----------------------
// FOOTER COMPONENT
// -----------------------
const Footer = () => {
    return (
        <footer className="w-full bg-slate-950/90 border-t border-slate-800/80 pt-10 pb-8 px-4 backdrop-blur-md overflow-x-hidden">
            
            {/* Cinematic Top Glow Line (Synced with Navbar) */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-indigo-500/40 via-sky-400/40 to-transparent" />

            <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">

                {/* LEFT — AT BADGE + Name + Copyright (Custom Colors) */}
                <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left text-white">
                    <ATBadge />
                    <div className="text-center sm:text-left">
                        <Link
                            to="/"
                            className="font-extrabold text-2xl text-indigo-300 hover:text-indigo-400 transition-colors tracking-tight"
                        >
                            Aayush Tripathi
                        </Link>
                        <p className="text-slate-500 text-sm mt-1">
                            &copy; {CURRENT_YEAR} All Rights Reserved.
                        </p>
                    </div>
                </div>

                {/* CENTER — Developer Description and Built with React */}
                <div className="flex flex-col items-center text-center text-slate-400 text-xs sm:text-sm">
                    <p className="mt-2">
                        Passionate about building seamless user experiences and innovative web applications.
                    </p>
                    <p className="mt-1">
                        Always open to new opportunities and collaborations. Let's build something great together!
                    </p>

                    <p className="text-slate-500 text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-2 mt-3">
                        <Code className="w-4 h-4 text-sky-400/80"/>
                        Built with React, Tailwind, and Framer Motion.
                    </p>
                </div>

                {/* RIGHT — Social Icons (Using cinematic components) */}
                <div className="flex space-x-6 text-gray-400 text-xl mt-6 sm:mt-0">
                    <SocialIcon href={EMAIL} label="Email">
                        <Mail className="w-6 h-6" />
                    </SocialIcon>

                    <SocialIcon href={LINKEDIN_URL} label="LinkedIn">
                        <Linkedin className="w-6 h-6" />
                    </SocialIcon>

                    <SocialIcon href={GITHUB_URL} label="GitHub">
                        <Github className="w-6 h-6" />
                    </SocialIcon>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
