import React, { useState, useEffect } from "react";
import api from "../utils/api"; // Updated import
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";
import TestimonialCard from "../components/TestimonialCard";
import { Briefcase, MessageSquareQuote } from "lucide-react";
import { motion } from "framer-motion";

const pageVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const sectionFade = { hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const cardFade = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } };

const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // --- UPDATED: Uses api.get ---
        const [projectsRes, testimonialsRes] = await Promise.all([
          api.get("/projects"),
          api.get("/testimonials"),
        ]);

        setAllProjects(projectsRes.data);
        setFeaturedProjects(projectsRes.data.slice(0, 3));
        setTestimonials(testimonialsRes.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load content. Please check back later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ... (Rest of the JSX remains exactly the same as your code, no changes needed below this line) ...
  const renderFeaturedSection = () => {
    if (error) return <p className="mb-10 font-semibold text-center text-red-400">{error}</p>;
    if (loading) return <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"><ProjectCardSkeleton /><ProjectCardSkeleton /><ProjectCardSkeleton /></motion.div>;
    return (
      <>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 gap-8 mb-10 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (<motion.div key={project._id} variants={cardFade}><ProjectCard project={project} /></motion.div>))}
        </motion.div>
        <div className="text-center"><a href="/work" className="inline-flex items-center gap-2 font-semibold text-indigo-400 transition-colors hover:text-indigo-300">View All {allProjects.length} Projects <Briefcase className="w-5 h-5" /></a></div>
      </>
    );
  };

  const renderTestimonials = () => {
    if (loading || error || testimonials.length === 0) return null;
    return (
      <motion.div className="my-20" variants={sectionFade} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <motion.div className="p-8 border shadow-xl md:p-12 bg-slate-900/60 border-slate-800 rounded-xl" variants={sectionFade}>
          <h2 className="flex items-center justify-center gap-3 mb-10 text-3xl font-extrabold text-center md:text-4xl text-slate-100"><MessageSquareQuote className="w-8 h-8 text-indigo-300" /> What Clients Say</h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 gap-8 lg:grid-cols-2">{testimonials.map((t) => (<motion.div key={t._id} variants={cardFade}><TestimonialCard testimonial={t} /></motion.div>))}</motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div className="min-h-screen bg-[#020617] text-white" variants={pageVariants} initial="initial" animate="animate">
      <Hero />
      <motion.section className="px-4 py-16 md:px-10" variants={sectionFade} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <motion.h2 variants={sectionFade} className="flex items-center justify-center gap-3 mb-10 text-3xl font-extrabold text-center md:text-4xl text-slate-100"><Briefcase className="w-8 h-8 text-indigo-300" /> Featured Work</motion.h2>
        {renderFeaturedSection()}
      </motion.section>
      {renderTestimonials()}
    </motion.div>
  );
};
export default HomePage;