import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";

// Page-level animation
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0.0, 0.2, 1],
      staggerChildren: 0.15,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const WorkPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch projects.");
      } finally {
        // Small delay to let skeletons be visible
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return (
      <div className="p-4 md:p-10 text-center text-red-400 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto max-w-6xl p-4 sm:p-6 md:p-10"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* HEADER */}
      <motion.div
        className="mb-10 md:mb-12 text-center"
        variants={headerVariants}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
          My Work
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          A selection of{" "}
          <span className="text-blue-300 font-medium">MERN-based projects</span>{" "}
          where I focused on clean architecture, performance, and a great user
          experience.
        </p>
      </motion.div>

      {/* GRID */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={pageVariants}
      >
        {loading ? (
          <>
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default WorkPage;
