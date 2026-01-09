import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Cpu,
  Database,
  Filter,
  FolderOpen,
  Layers,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";

// Components
import ProjectCard from "../components/ProjectCard";

// --- ⚙️ CONFIGURATION ---
const FILTER_TABS = [
  { id: "ALL", label: "All Systems" },
  { id: "MERN", label: "MERN Stack" },
  { id: "NEXT.JS", label: "Next.js" },
  { id: "REACT", label: "React Native" }, // Example variation
  { id: "NODE", label: "Backend API" },
];

// --- 🪝 CUSTOM HOOK: Data Fetching ---
// Separation of Concerns: Logic is isolated from the View
const useProjects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await api.get("/projects", {
          signal: controller.signal,
        });
        setData(response.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Data Fetch Error:", err);
          setError("CONNECTION_REFUSED: Database Unreachable");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return { data, loading, error };
};

// --- 🦴 COMPONENT: Skeleton Loader ---
const SkeletonGrid = () => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="h-[420px] rounded-2xl bg-slate-900/50 border border-slate-800/50 animate-pulse flex flex-col overflow-hidden"
      >
        <div className="h-48 bg-slate-800/50" />
        <div className="p-6 space-y-4">
          <div className="w-3/4 h-6 rounded bg-slate-800/50" />
          <div className="space-y-2">
            <div className="w-full h-3 rounded bg-slate-800/30" />
            <div className="w-5/6 h-3 rounded bg-slate-800/30" />
          </div>
          <div className="flex gap-2 pt-4">
            <div className="w-16 h-6 rounded bg-slate-800/30" />
            <div className="w-16 h-6 rounded bg-slate-800/30" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// --- 🚀 MAIN COMPONENT ---
const WorkPage = () => {
  const { data: projects, loading, error } = useProjects();

  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce Search Input (Performance Optimization)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // --- MEMOIZED FILTERING LOGIC ---
  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    return projects.filter((project) => {
      const q = debouncedSearch.toLowerCase();
      // Defensive checks using Optional Chaining (?.)
      const matchesSearch =
        project.title?.toLowerCase().includes(q) ||
        project.description?.toLowerCase().includes(q) ||
        project.tags?.some((tag) => tag.toLowerCase().includes(q));

      const matchesFilter =
        activeFilter === "ALL"
          ? true
          : project.tags?.some((tag) => tag.toUpperCase() === activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [projects, activeFilter, debouncedSearch]);

  // --- MEMOIZED STATS ---
  const stats = useMemo(() => {
    return {
      total: projects.length,
      deployed: projects.filter((p) => p.liveLink).length,
    };
  }, [projects]);

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // --- RENDER ERROR STATE ---
  if (error)
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-center px-4">
        <div className="p-4 mb-4 border rounded-full bg-red-500/10 border-red-500/20">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-white">SYSTEM FAILURE</h2>
        <p className="mb-6 font-mono text-sm text-red-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 text-sm font-bold text-white transition-colors border rounded-lg bg-slate-800 hover:bg-slate-700 border-slate-700"
        >
          REBOOT SYSTEM
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pb-20 relative overflow-x-hidden selection:bg-blue-500/30">
      {/* Background Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <main className="container relative z-10 px-4 pt-16 mx-auto max-w-7xl md:px-6">
        {/* --- 1. HEADER SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between gap-8 pb-10 mb-10 border-b md:flex-row md:items-end border-slate-800"
        >
          <div>
            <div className="flex items-center gap-2 mb-3 font-mono text-xs text-blue-400">
              <FolderOpen className="w-4 h-4" />
              <span>~/work_archives</span>
            </div>
            <h1 className="mb-3 text-4xl font-black tracking-tight text-white md:text-5xl">
              Project{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Database
              </span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-400">
              Accessing deployment logs. A curated collection of
              high-performance modules engineered for scalability, security, and
              user experience.
            </p>
          </div>

          {/* Stats HUD */}
          <div className="flex gap-4">
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col items-center min-w-[100px] backdrop-blur-sm">
              <Database className="w-5 h-5 mb-2 text-emerald-400" />
              <span className="text-2xl font-black text-white">
                {loading ? "-" : stats.total}
              </span>
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                Modules
              </span>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col items-center min-w-[100px] backdrop-blur-sm">
              <Cpu className="w-5 h-5 mb-2 text-blue-400" />
              <span className="text-2xl font-black text-white">100%</span>
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                Uptime
              </span>
            </div>
          </div>
        </motion.div>

        {/* --- 2. CONTROL PANEL --- */}
        <div className="flex flex-col gap-6 mb-12 lg:flex-row lg:items-center">
          {/* Search Input */}
          <div className="relative w-full group lg:w-96">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-20 group-focus-within:opacity-60 transition duration-500 blur" />
            <div className="relative flex items-center bg-[#0B1120] rounded-lg border border-slate-800">
              <div className="pl-4 text-slate-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search protocols..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-3 pr-4 font-mono text-sm bg-transparent border-none focus:ring-0 text-slate-200 placeholder:text-slate-600 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="pr-4 text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 lg:ml-auto">
            <div className="flex items-center hidden gap-2 mr-2 font-mono text-xs tracking-widest uppercase text-slate-500 sm:flex">
              <Filter className="w-3 h-3" /> Filter:
            </div>
            {FILTER_TABS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  relative px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300
                  ${
                    activeFilter === filter.id
                      ? "text-white bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-500"
                      : "text-slate-400 bg-slate-900 border border-slate-800 hover:border-slate-600 hover:text-white"
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- 3. PROJECT GRID --- */}
        {loading ? (
          <SkeletonGrid />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    layout
                    variants={itemVariants}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="h-full"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                /* Empty State */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center border border-dashed col-span-full border-slate-800 rounded-3xl bg-slate-900/20"
                >
                  <div className="flex items-center justify-center w-20 h-20 mb-6 border rounded-full bg-slate-900 border-slate-800">
                    <Layers className="w-10 h-10 text-slate-600" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Data Void
                  </h3>
                  <p className="max-w-md mx-auto mb-8 font-mono text-sm text-slate-500">
                    No modules found matching query "
                    <span className="text-white">{debouncedSearch}</span>".{" "}
                    <br />
                    Try adjusting search parameters or clearing filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("ALL");
                    }}
                    className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 shadow-blue-900/20"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default WorkPage;
