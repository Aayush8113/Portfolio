import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  MessageSquareQuote,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

// Core Components
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";
import TestimonialCard from "../components/TestimonialCard";

// --- 🪝 CUSTOM HOOK: Data Layer ---
const useHomeData = () => {
  const [data, setData] = useState({ projects: [], testimonials: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        // Parallel fetching for performance
        // Using allSettled to prevent one failure from breaking the entire page
        const [projectsRes, testimonialsRes] = await Promise.allSettled([
          api.get("/projects", { signal: controller.signal }),
          api.get("/testimonials", { signal: controller.signal }),
        ]);

        setData({
          projects:
            projectsRes.status === "fulfilled"
              ? projectsRes.value.data.slice(0, 3)
              : [],
          testimonials:
            testimonialsRes.status === "fulfilled"
              ? testimonialsRes.value.data
              : [],
        });
      } catch (err) {
        console.error("System Failure:", err);
        setError("DATA_FETCH_FAILURE");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return { ...data, loading, error };
};

// --- 🧩 SUB-COMPONENTS ---

// 1. Infinite Tech Ticker
const TechTicker = () => {
  const TECH_STACK = [
    "REACT",
    "NEXT.JS",
    "NODE.JS",
    "MONGODB",
    "TYPESCRIPT",
    "TAILWIND",
    "FRAMER MOTION",
    "AWS",
    "DOCKER",
    "REDIS",
    "GRAPHQL",
    "POSTGRES",
  ];

  return (
    <div className="w-full bg-[#020617] border-y border-slate-800/60 overflow-hidden py-6 relative z-20">
      {/* Gradient Masks for smooth fade out */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

      <div className="flex select-none">
        <motion.div
          className="flex gap-8 sm:gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {/* Quadruple the array to ensure seamless looping on large screens */}
          {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map(
            (item, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 transition-colors rounded-full bg-slate-800 group-hover:bg-blue-500" />
                <span className="text-sm font-black tracking-tighter transition-colors sm:text-xl text-slate-700 group-hover:text-slate-300">
                  {item}
                </span>
              </div>
            ),
          )}
        </motion.div>
      </div>
    </div>
  );
};

// 2. Stats Dashboard
const StatsSection = () => {
  const stats = [
    {
      icon: Code2,
      label: "Commits Pushed",
      value: "1,200+",
      color: "text-blue-400",
    },
    {
      icon: Database,
      label: "System Uptime",
      value: "99.9%",
      color: "text-emerald-400",
    },
    {
      icon: Cpu,
      label: "Projects Shipped",
      value: "25+",
      color: "text-purple-400",
    },
    {
      icon: Globe,
      label: "Happy Clients",
      value: "100%",
      color: "text-amber-400",
    },
  ];

  return (
    <section className="relative z-10 py-16 border-b sm:py-24 border-slate-900/50">
      <div className="container px-4 mx-auto max-w-7xl sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="relative p-6 rounded-2xl bg-[#0f172a]/40 border border-slate-800/60 backdrop-blur-sm overflow-hidden group"
            >
              {/* Subtle background glow */}
              <div
                className={`absolute -right-6 -top-6 p-12 rounded-full ${stat.color} bg-current opacity-5 blur-3xl transition-opacity group-hover:opacity-10`}
              />

              <div className="relative z-10">
                <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
                <span className="block mb-1 text-3xl font-black tracking-tight text-white">
                  {stat.value}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. Featured Projects Wrapper
const FeaturedWork = ({ projects, loading }) => (
  <section className="relative py-20 sm:py-24">
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(15,23,42,0.5),transparent)] pointer-events-none" />

    <div className="container relative px-4 mx-auto max-w-7xl sm:px-6">
      <div className="flex flex-col items-start justify-between gap-6 mb-16 md:items-end md:flex-row">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border rounded-full bg-blue-900/10 border-blue-500/20 text-blue-400 text-[10px] font-mono">
            <Layers className="w-3 h-3" /> RECENT_DEPLOYMENTS
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Modules
            </span>
          </h2>
        </div>

        <Link
          to="/work"
          className="flex items-center gap-2 text-sm font-bold transition-colors group text-slate-400 hover:text-white"
        >
          VIEW ARCHIVES
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array(3)
              .fill(0)
              .map((_, i) => <ProjectCardSkeleton key={i} />)
          : projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
      </div>
    </div>
  </section>
);

// 4. Testimonials Wrapper
const Testimonials = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="relative py-16 overflow-hidden sm:py-24">
      {/* Skewed Background */}
      <div className="absolute inset-0 bg-[#0f172a]/20 -skew-y-2 transform origin-top-left scale-110 pointer-events-none" />

      <div className="container relative z-10 px-4 mx-auto max-w-7xl sm:px-6">
        <div className="mb-16 text-center">
          <h2 className="flex items-center justify-center gap-3 mb-4 text-3xl font-black text-white sm:text-4xl">
            <MessageSquareQuote className="w-8 h-8 text-emerald-400" />
            Client Feedback
          </h2>
          <p className="font-mono text-xs tracking-widest uppercase text-slate-500">
            Verified Transmissions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {data.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Call to Action
const CTASection = () => (
  <section className="relative flex items-center justify-center py-24 overflow-hidden sm:py-24">
    <div className="absolute inset-0 bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1),transparent_70%)]" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>

    <div className="relative z-10 max-w-3xl px-6 text-center">
      <h2 className="mb-8 text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-7xl">
        Ready to <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
          Initialize Project?
        </span>
      </h2>
      <p className="max-w-2xl mx-auto mb-10 text-base leading-relaxed sm:text-xl text-slate-400">
        Let's collaborate to build scalable, high-performance software that
        leaves a lasting digital footprint.
      </p>

      <Link
        to="/contact"
        className="relative inline-flex items-center justify-center px-10 py-5 overflow-hidden text-sm font-bold text-black transition-transform bg-white rounded-full group hover:scale-105"
      >
        <span className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 group-hover:opacity-100" />
        <span className="relative flex items-center gap-3 tracking-widest uppercase transition-colors group-hover:text-white">
          <Zap className="w-5 h-5" /> Start Collaboration
        </span>
      </Link>
    </div>
  </section>
);

// --- 🚀 MAIN PAGE COMPONENT ---
const HomePage = () => {
  // Use custom hook to fetch data
  const { projects, testimonials, loading } = useHomeData();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden selection:bg-blue-500/30">
      <Hero />
      <TechTicker />
      <StatsSection />
      <FeaturedWork projects={projects} loading={loading} />
      <Testimonials data={testimonials} />
      <CTASection />
    </div>
  );
};

export default HomePage;
