import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Tag, Globe, Github, ArrowLeft, ArrowUpRight } from "lucide-react";

// =============================================================
// 🌌 FLOATING PARTICLES — Premium Ambient Background
// =============================================================
const FloatingParticles = () => {
  const total = 26;

  const getRandom = (max) => Math.random() * max;

  const width = typeof window !== "undefined" ? window.innerWidth : 1440;
  const height = typeof window !== "undefined" ? window.innerHeight : 900;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-sky-400/60
                     shadow-[0_0_14px_rgba(56,189,248,0.9)]"
          initial={{
            x: getRandom(width),
            y: getRandom(height),
            opacity: Math.random() * 0.5 + 0.3,
            scale: Math.random() * 0.6 + 0.5,
          }}
          animate={{
            y: ["0%", "-18%", "0%"],
            opacity: [0.4, 0.95, 0.5],
          }}
          transition={{
            duration: Math.random() * 6 + 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// =============================================================
// ✨ ANIMATION VARIANTS
// =============================================================
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const staggerParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.12 },
  },
};

// =============================================================
// 🚀 MAIN COMPONENT — ProjectDetailPage
// =============================================================
const ProjectDetailPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 FETCH PROJECT FROM BACKEND
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/projects/${id}`
        );

        // Small delay to let the animations feel intentional
        await new Promise((resolve) => setTimeout(resolve, 300));
        setProject(response.data || null);
      } catch (err) {
        console.error(err);
        setError("Could not find that project. It may have been removed.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  // =============================================================
  // 🔁 Loading / Error / Not-found states
  // =============================================================
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400" />
          <p className="text-sm tracking-wide text-slate-400/90">
            Loading project details…
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md rounded-xl border border-red-500/40 bg-red-950/20 px-6 py-5 text-center text-red-200">
          <p className="font-semibold">{error}</p>
          <Link
            to="/work"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-300 hover:text-sky-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-slate-400">
        Project not found.
      </div>
    );
  }

  // =============================================================
  // ⭐ FINAL RENDER
  // =============================================================
  return (
    <div className="relative">
      {/* Ambient background particles */}
      <FloatingParticles />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={staggerParent}
        className="relative z-[5] container mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12"
      >
        {/* BACK BUTTON */}
        <motion.div variants={fadeUp} className="mb-6 md:mb-8">
          <Link
            to="/work"
            className="group inline-flex items-center text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
          >
            <ArrowLeft className="mr-1 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </motion.div>

        {/* TITLE + COVER IMAGE */}
        <motion.header variants={fadeUp} className="mb-10 md:mb-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="mt-2 text-sm text-slate-400 md:text-base">
                  {project.subtitle}
                </p>
              )}
            </div>

            {/* Optional tag row inline near title */}
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="rounded-full border border-slate-600/70 bg-slate-900/70 
                               px-3 py-1 text-xs font-medium text-sky-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Main Image */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl shadow-black/50">
            <div className="relative">
              <img
                src={project.imageUrl}
                alt={project.title}
                loading="lazy"
                className="h-64 w-full object-cover sm:h-80 lg:h-[430px]"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/800x450/020617/ffffff?text=Project+Preview";
                }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent" />
            </div>
          </div>

          {/* Full tags row below image */}
          {project.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <Tag className="h-4 w-4 text-slate-500" />
              {project.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 
                             text-xs font-medium text-sky-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.header>

        {/* CONTENT + SIDEBAR */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* MAIN CONTENT */}
          <motion.section
            variants={fadeUp}
            className="prose prose-sm max-w-none prose-invert md:prose-base lg:prose-lg lg:w-2/3"
          >
            {project.challenge && (
              <>
                <h2 className="mb-3 border-b border-sky-600/50 pb-2 text-2xl font-bold">
                  The Challenge
                </h2>
                <p className="lead text-slate-300">{project.challenge}</p>
              </>
            )}

            {project.solution && (
              <>
                <h2 className="mt-10 mb-3 border-b border-sky-600/50 pb-2 text-2xl font-bold">
                  The Solution
                </h2>
                <p className="lead text-slate-300">{project.solution}</p>
              </>
            )}

            {project.techStack && (
              <>
                <h2 className="mt-10 mb-3 border-b border-sky-600/50 pb-2 text-2xl font-bold">
                  Tech Stack & Responsibilities
                </h2>
                <p className="text-slate-300">{project.techStack}</p>
              </>
            )}
          </motion.section>

          {/* SIDEBAR ACTIONS */}
          <motion.aside
            variants={fadeUp}
            className="relative h-fit rounded-2xl border border-slate-700/70 
                       bg-slate-900/80 p-6 shadow-xl shadow-black/50 
                       backdrop-blur-xl lg:w-1/3"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl 
                            border border-sky-500/20" />

            <h3 className="mb-5 text-center text-lg font-semibold text-slate-50">
              Project Actions
            </h3>

            <div className="space-y-4">
              {/* LIVE SITE BUTTON */}
              {project.liveLink && (
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg 
                             bg-sky-600 px-6 py-3 text-sm font-semibold text-white 
                             shadow-md shadow-sky-900/60 transition-all 
                             hover:bg-sky-500"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Globe className="h-5 w-5" />
                  View Live Site
                </motion.a>
              )}

              {/* GITHUB BUTTON */}
              {project.githubLink && (
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg 
                             bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-50 
                             shadow-md shadow-black/60 transition-all 
                             hover:bg-slate-700"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Github className="h-5 w-5" />
                  View GitHub Repo
                </motion.a>
              )}

              {/* CONTACT CTA BUTTON */}
              <Link
                to="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-lg 
                           border border-slate-600 px-6 py-3 text-sm font-semibold 
                           text-slate-200 shadow-md shadow-black/40 
                           transition-all hover:bg-slate-800/80"
              >
                <ArrowUpRight className="h-5 w-5" />
                Start a Project Like This
              </Link>
            </div>
          </motion.aside>
        </div>
      </motion.main>
    </div>
  );
};

export default ProjectDetailPage;
