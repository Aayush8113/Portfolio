import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Share2,
  Terminal,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

// --- 🧩 REUSABLE COMPONENTS ---

const SpotlightSection = ({ children, className = "" }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute z-10 transition duration-300 opacity-0 pointer-events-none -inset-px rounded-2xl group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.10), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

const StatBadge = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 border rounded-lg bg-slate-900/50 border-slate-800">
    <div className="p-2 text-blue-400 rounded-md bg-slate-800">
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-200">{value}</p>
    </div>
  </div>
);

const ProjectHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-between mb-10"
  >
    <Link
      to="/work"
      className="flex items-center gap-2 font-mono text-sm transition-colors group text-slate-500 hover:text-blue-400"
    >
      <div className="p-1 transition-colors border rounded-full border-slate-700 group-hover:border-blue-500">
        <ArrowLeft className="w-4 h-4" />
      </div>
      <span>../work_archives</span>
    </Link>

    <div className="flex items-center gap-2 px-3 py-1 border rounded-full bg-emerald-950/30 border-emerald-900/50">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">
        System Online
      </span>
    </div>
  </motion.div>
);

// --- 🚀 MAIN PAGE ---
const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error("Project Fetch Error:", err);
        setError("Failed to retrieve project data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin" />
            <div className="absolute border-b-2 rounded-full inset-2 border-emerald-500 animate-spin reverse" />
          </div>
          <span className="font-mono text-xs text-blue-400 animate-pulse">
            DECRYPTING ARCHIVES...
          </span>
        </div>
      </div>
    );

  if (error || !project)
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-slate-400">
        <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
        <h2 className="mb-4 text-2xl font-bold text-white">
          DATA CORRUPTION DETECTED
        </h2>
        <p className="mb-8 font-mono text-sm text-slate-500">
          Error Code: 404_PROJECT_NOT_FOUND
        </p>
        <button
          onClick={() => navigate("/work")}
          className="px-6 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Return to Safety
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pb-20 overflow-x-hidden selection:bg-emerald-500/30">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <main className="container relative z-10 px-4 pt-16 mx-auto max-w-7xl md:px-6">
        <ProjectHeader />

        {/* --- 1. HERO SECTION --- */}
        <SpotlightSection className="relative rounded-2xl border border-slate-800 bg-[#0f172a]/50 p-2 mb-12 shadow-2xl">
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between h-8 px-4 border-b bg-slate-900/90 border-slate-800 rounded-t-xl backdrop-blur-sm">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
            </div>
            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              render_preview.png
            </div>
          </div>

          <div className="relative w-full mt-8 overflow-hidden aspect-video rounded-xl bg-slate-950 group/img">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="object-cover w-full h-full transition-opacity duration-700 opacity-80 group-hover/img:opacity-100"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {project.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mb-3 text-3xl font-black tracking-tighter text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                {project.title}
              </h1>
              <p className="max-w-3xl text-base md:text-lg text-slate-300 line-clamp-2 drop-shadow-md">
                {project.description}
              </p>
            </div>
          </div>
        </SpotlightSection>

        {/* --- 2. CONTENT GRID --- */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* LEFT: MAIN CONTENT */}
          <div className="space-y-10 lg:col-span-2">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <StatBadge icon={User} label="Role" value="Full Stack" />
              <StatBadge icon={Calendar} label="Timeline" value="4 Weeks" />
              <StatBadge icon={Layers} label="Stack" value="MERN" />
              <StatBadge icon={Cpu} label="Status" value="Deployed" />
            </div>

            {/* Case Study */}
            <div className="space-y-8">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="flex items-center gap-3 pb-4 mb-4 text-xl font-bold text-white border-b border-slate-800">
                  <Zap className="w-5 h-5 text-yellow-400" /> The Challenge
                </h3>
                <p className="text-base leading-relaxed text-slate-400">
                  {project.challenge ||
                    "The core objective was to engineer a high-performance system capable of handling concurrent user requests while maintaining sub-100ms latency. Scalability and data integrity were paramount."}
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="flex items-center gap-3 pb-4 mb-4 text-xl font-bold text-white border-b border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> The
                  Solution
                </h3>
                <p className="text-base leading-relaxed text-slate-400">
                  {project.solution ||
                    "Implemented a microservices-ready architecture using Node.js for the backend and optimized React reconciliation on the frontend. Utilized Redis for caching and Docker for containerized deployment."}
                </p>
              </motion.section>

              <section>
                <h3 className="flex items-center gap-3 pb-4 mb-6 text-xl font-bold text-white border-b border-slate-800">
                  <Code2 className="w-5 h-5 text-purple-400" /> Architecture
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {project.tags?.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 p-3 font-mono text-sm transition-colors border rounded-lg bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {tech}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* RIGHT: SIDEBAR ACTIONS */}
          <div className="space-y-6">
            <SpotlightSection className="rounded-xl border border-slate-800 bg-[#0f172a]/80 p-6 backdrop-blur-xl sticky top-24">
              <h3 className="flex items-center gap-2 mb-6 text-sm font-bold tracking-widest text-white uppercase">
                <Terminal className="w-4 h-4 text-blue-500" /> Control Panel
              </h3>

              <div className="space-y-4">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between w-full p-4 font-bold text-white transition-all bg-blue-600 rounded-lg shadow-lg group hover:bg-blue-500 shadow-blue-500/20 hover:shadow-blue-500/40"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-5 h-5" /> Live Demo
                    </span>
                    <ExternalLink className="w-4 h-4 transition-transform opacity-70 group-hover:translate-x-1" />
                  </a>
                )}

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between w-full p-4 font-bold text-white transition-all border rounded-lg group bg-slate-800 hover:bg-slate-700 border-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-5 h-5" /> Source Code
                    </span>
                    <Code2 className="w-4 h-4 transition-transform opacity-70 group-hover:rotate-12" />
                  </a>
                )}
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 font-mono text-xs border-t border-slate-700/50 text-slate-400">
                <span>Connection</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Share2 className="w-3 h-3" /> Secure (TLS 1.3)
                </span>
              </div>
            </SpotlightSection>

            <div className="p-6 border rounded-xl border-slate-800/60 bg-gradient-to-br from-slate-900 to-slate-950">
              <h4 className="mb-2 font-bold text-white">
                Need something similar?
              </h4>
              <p className="mb-4 text-sm text-slate-400">
                I can architect this solution for your next product launch.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-sm font-bold text-blue-400 transition-colors hover:text-white group"
              >
                Initialise Request{" "}
                <ArrowLeft className="w-4 h-4 ml-1 transition-transform rotate-180 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
