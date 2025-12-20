import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, ArrowRight, ExternalLink, Tag } from "lucide-react";

// Card entrance animation
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="relative flex flex-col h-full overflow-hidden transition-all duration-300 border shadow-2xl group bg-gray-900/90 border-gray-700/70 rounded-2xl backdrop-blur-md"
      whileHover={{
        y: -10,
        scale: 1.03,
        boxShadow:
          "0 20px 45px rgba(15,23,42,0.9), 0 0 40px rgba(37,99,235,0.45)",
        borderColor: "rgba(96,165,250,0.9)",
        transition: { type: "spring", stiffness: 260, damping: 20 },
      }}
    >
      {/* IMAGE SECTION */}
      <motion.div
        className="relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="object-cover w-full h-48 transition-all duration-700 transform group-hover:scale-110"
        />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-950/80 via-gray-900/10 to-transparent" />

        {/* Top-left subtle label (optional) */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold 
                        bg-gray-900/80 border border-blue-500/40 text-blue-300 uppercase tracking-wide">
          {project.type || "MERN Project"}
        </div>

        {/* Glow line at bottom */}
        <div
          className="absolute bottom-0 w-full h-[2px] 
                     bg-gradient-to-r from-indigo-400/10 via-blue-400/70 to-indigo-400/10 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </motion.div>

      {/* CONTENT SECTION */}
      <div className="flex flex-col flex-grow p-5">
        <h3
          className="mb-2 text-xl font-bold tracking-tight text-white transition-colors md:text-2xl group-hover:text-indigo-300"
        >
          {project.title}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-gray-400 line-clamp-3">
          {project.description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Tag className="w-4 h-4 text-gray-500" />
          {project.tags?.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="px-3 py-1 text-xs font-medium text-blue-300 transition-colors rounded-full bg-gray-800/80 hover:bg-gray-700/90"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* FOOTER LINKS */}
        <div className="pt-4 mt-auto border-t border-gray-700/80">
          <div className="flex items-center justify-between">
            {/* Internal "View Details" link */}
            <Link
              to={`/work/${project._id}`}
              className="flex items-center gap-1 font-semibold text-indigo-400 transition-colors hover:text-indigo-300 group"
            >
              View Details
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* External links */}
            <div className="flex gap-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-transform duration-200 hover:text-white hover:scale-110"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-transform duration-200 hover:text-white hover:scale-110"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
