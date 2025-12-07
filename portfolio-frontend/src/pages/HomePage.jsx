import React, { useState, useEffect } from "react";
import axios from "axios";

import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";
import TestimonialCard from "../components/TestimonialCard";

import { Briefcase, MessageSquareQuote } from "lucide-react";
import { motion } from "framer-motion";

// --------------------------
// INLINE ANIMATION VARIANTS
// --------------------------

// Whole Page Load
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Section Fade-Up
const sectionFade = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Stagger for multiple items
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Card animation
const cardFade = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --------------------------
  // FETCH ALL DATA
  // --------------------------
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [projectsRes, testimonialsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/projects"),
          axios.get("http://localhost:5000/api/testimonials"),
        ]);

        setAllProjects(projectsRes.data);
        setFeaturedProjects(projectsRes.data.slice(0, 3)); // first 3
        setTestimonials(testimonialsRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to connect to API. Please check backend server.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // --------------------------
  // FEATURED PROJECT SECTION
  // --------------------------
  const renderFeaturedSection = () => {
    if (error) {
      return (
        <p className="text-center text-red-400 font-semibold mb-10">{error}</p>
      );
    }

    if (loading) {
      return (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </motion.div>
      );
    }

    return (
      <>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project._id} variants={cardFade}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <a
            href="/work"
            className="inline-flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
          >
            View All {allProjects.length} Projects
            <Briefcase className="w-5 h-5" />
          </a>
        </div>
      </>
    );
  };

  // --------------------------
  // TESTIMONIALS
  // --------------------------
  const renderTestimonials = () => {
    if (loading || error || testimonials.length === 0) return null;

    return (
      <motion.div
        className="my-20"
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div
          className="p-8 md:p-12 bg-slate-900/60 border border-slate-800 rounded-xl shadow-xl"
          variants={sectionFade}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center flex items-center justify-center gap-3 text-slate-100">
            <MessageSquareQuote className="w-8 h-8 text-indigo-300" />
            What Clients Say
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div key={t._id} variants={cardFade}>
                <TestimonialCard testimonial={t} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  // --------------------------
  // PAGE JSX
  // --------------------------
  return (
    <motion.div
      className="min-h-screen bg-[#020617] text-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* HERO */}
      <Hero />

      {/* FEATURED PROJECTS */}
      <motion.section
        className="py-16 px-4 md:px-10"
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={sectionFade}
          className="text-3xl md:text-4xl font-extrabold mb-10 text-center flex items-center justify-center gap-3 text-slate-100"
        >
          <Briefcase className="w-8 h-8 text-indigo-300" />
          Featured Work
        </motion.h2>

        {renderFeaturedSection()}
      </motion.section>

      {/* TESTIMONIALS */}
      {renderTestimonials()}
    </motion.div>
  );
};

export default HomePage;
