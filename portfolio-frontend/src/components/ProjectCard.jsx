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
      className="group bg-gray-900/90 border border-gray-700/70 rounded-2xl shadow-2xl overflow-hidden 
                 h-full flex flex-col backdrop-blur-md relative transition-all duration-300"
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
          className="w-full h-48 object-cover transform 
                     group-hover:scale-110 transition-all duration-700"
        />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-900/10 to-transparent pointer-events-none" />

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
      <div className="p-5 flex flex-col flex-grow">
        <h3
          className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2
                     group-hover:text-indigo-300 transition-colors"
        >
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
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
              className="bg-gray-800/80 text-blue-300 text-xs font-medium px-3 py-1 rounded-full 
                         hover:bg-gray-700/90 transition-colors"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* FOOTER LINKS */}
        <div className="mt-auto pt-4 border-t border-gray-700/80">
          <div className="flex justify-between items-center">
            {/* Internal "View Details" link */}
            <Link
              to={`/work/${project._id}`}
              className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors group"
            >
              View Details
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* External links */}
            <div className="flex gap-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-transform duration-200 hover:scale-110"
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
                  className="text-gray-400 hover:text-white transition-transform duration-200 hover:scale-110"
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
