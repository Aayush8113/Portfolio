import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Github, Mail, Code } from "lucide-react"; 
import { motion } from "framer-motion";

// --- FIXED URL ---
const GITHUB_URL = "https://github.com/Aayush8113"; // Removed extra https://
const LINKEDIN_URL = "https://linkedin.com/in/aayushtripathi081103";
const EMAIL = "mailto:aayushtripathi.tech@gmail.com";
const CURRENT_YEAR = new Date().getFullYear();

// ... (Rest of your Footer code is perfect, just copy the constant fix above) ...

// For the sake of "Ready to paste", here is the abbreviated return:
const Footer = () => {
    return (
        <footer className="w-full bg-slate-950/90 border-t border-slate-800/80 pt-10 pb-8 px-4 backdrop-blur-md overflow-x-hidden">
            <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center text-center text-slate-400 text-xs sm:text-sm">
                   <p className="mt-2">Passionate about building seamless user experiences.</p>
                   <p className="text-slate-500 text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-2 mt-3">
                       <Code className="w-4 h-4 text-sky-400/80"/> Built with React, Tailwind, and Framer Motion.
                   </p>
                </div>
                {/* Social Icons using FIXED constants */}
                <div className="flex space-x-6 text-gray-400 text-xl mt-6 sm:mt-0">
                    <a href={EMAIL} className="hover:text-sky-400 transition-colors"><Mail className="w-6 h-6" /></a>
                    <a href={LINKEDIN_URL} className="hover:text-sky-400 transition-colors"><Linkedin className="w-6 h-6" /></a>
                    <a href={GITHUB_URL} className="hover:text-sky-400 transition-colors"><Github className="w-6 h-6" /></a>
                </div>
            </div>
        </footer>
    );
};
export default Footer;