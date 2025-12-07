import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  Monitor,
  Database,
  Layers,
  ArrowRight,
  BrainCircuit,
  Sparkles,
  FileText,
} from "lucide-react";

// Tech Icons
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiJavascript,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si";

// --- Page-load Animation (for each *section*) ---
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
};

// --- Variants for the Grids and Items ---
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// --- "VALUE PROPOSITION" CARD COMPONENT ---
const ValueCard = ({ icon, title, description }) => (
  <motion.div
    className="group h-full cursor-pointer rounded-xl border border-gray-700/50 
               bg-gray-800/80 p-6 shadow-lg backdrop-blur-sm 
               transition-all duration-300"
    whileHover={{
      y: -8,
      boxShadow: "0 0 30px rgba(37, 99, 235, 0.45)",
      borderColor: "rgba(59,130,246,0.8)",
    }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    variants={gridItemVariants}
  >
    <div className="inline-flex rounded-full bg-blue-500/10 p-3 
                    transition-transform duration-300 ease-out group-hover:scale-110">
      {icon}
    </div>
    <h3 className="mt-4 mb-2 text-xl font-bold tracking-tight text-white">
      {title}
    </h3>
    <p className="text-sm leading-relaxed text-gray-300">{description}</p>
  </motion.div>
);

// === CINEMATIC SKILL ORB (per skill) ===
const accentConfig = {
  frontend: {
    ring: "stroke-sky-400 group-hover:stroke-sky-300",
    glow: "bg-sky-500/15 group-hover:bg-sky-500/30",
    label: "text-sky-300",
  },
  backend: {
    ring: "stroke-emerald-400 group-hover:stroke-emerald-300",
    glow: "bg-emerald-500/15 group-hover:bg-emerald-500/30",
    label: "text-emerald-300",
  },
  tools: {
    ring: "stroke-amber-400 group-hover:stroke-amber-300",
    glow: "bg-amber-500/15 group-hover:bg-amber-500/30",
    label: "text-amber-300",
  },
};

const SkillOrb = ({ skill, level, category, icon }) => {
  const percentage = parseInt(level, 10);

  const radius = 50;
  const center = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const [hasAnimated, setHasAnimated] = useState(false);
  const progress = useMotionValue(0);
  const progressText = useTransform(progress, (latest) => `${Math.round(latest)}%`);

  useEffect(() => {
    if (hasAnimated) {
      animate(progress, percentage, {
        duration: 1.4,
        ease: "easeOut",
      });
    }
  }, [hasAnimated, percentage, progress]);

  const circleVariants = {
    hidden: { strokeDashoffset: circumference },
    visible: {
      strokeDashoffset,
      transition: { duration: 1.4, ease: "easeOut" },
    },
  };

  const accent = accentConfig[category] ?? accentConfig.frontend;

  return (
    <motion.div
      className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl 
                 border border-gray-800 bg-gradient-to-b from-slate-900/90 to-slate-950/95 
                 p-4 shadow-lg shadow-black/40 transition-all duration-300
                 hover:border-blue-500/70 hover:shadow-[0_0_35px_rgba(37,99,235,0.55)]"
      whileHover={{ scale: 1.05, y: -4 }}
      variants={gridItemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      onViewportEnter={() => {
        if (!hasAnimated) setHasAnimated(true);
      }}
    >
      {/* Icon Badge */}
      <div className="mb-2 flex items-center justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full 
                        border border-gray-700 bg-slate-950/90 shadow-md shadow-black/40">
          {icon}
        </div>
      </div>

      <div className="relative flex h-28 w-28 items-center justify-center md:h-32 md:w-32">
        {/* Glowing backdrop ring */}
        <div
          className={`absolute inset-1 rounded-full blur-xl ${accent.glow}`}
        />

        <svg
          className="h-full w-full -rotate-90"
          viewBox="0 0 120 120"
        >
          {/* Background Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="stroke-gray-800 transition-colors duration-300 group-hover:stroke-gray-700"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={accent.ring}
            strokeDasharray={circumference}
            variants={circleVariants}
            animate={hasAnimated ? "visible" : "hidden"}
          />
        </svg>

        {/* Percentage Text */}
        <motion.span
          className="absolute text-lg font-bold text-gray-100 md:text-xl"
        >
          {progressText}
        </motion.span>
      </div>

      <h3
        className={`mt-3 text-center text-sm font-semibold transition-colors duration-300 
                    md:text-base ${accent.label}`}
      >
        {skill}
      </h3>

      <p className="mt-1 text-center text-[10px] uppercase tracking-[0.18em] text-gray-500">
        {category === "frontend"
          ? "Frontend & UI"
          : category === "backend"
          ? "Backend & APIs"
          : "Tools & Workflow"}
      </p>
    </motion.div>
  );
};

// === FULL-STACK SKILL GROUPS ===
const skillGroups = [
  {
    title: "Frontend & UI",
    subtitle: "Everything that users see and touch.",
    category: "frontend",
    skills: [
      { skill: "React", level: "90%", icon: <SiReact className="text-sky-400" /> },
      { skill: "Next.js", level: "80%", icon: <SiNextdotjs className="text-gray-200" /> },
      { skill: "Tailwind CSS", level: "95%", icon: <SiTailwindcss className="text-sky-300" /> },
      { skill: "HTML5", level: "95%", icon: <SiHtml5 className="text-orange-400" /> },
    ],
  },
  {
    title: "Backend & APIs",
    subtitle: "Logic, data, and performance behind the scenes.",
    category: "backend",
    skills: [
      { skill: "Node.js", level: "85%", icon: <SiNodedotjs className="text-emerald-400" /> },
      { skill: "Express.js", level: "85%", icon: <SiExpress className="text-gray-200" /> },
      { skill: "MongoDB", level: "75%", icon: <SiMongodb className="text-emerald-300" /> },
      { skill: "REST APIs", level: "80%", icon: <SiPostman className="text-orange-400" /> },
    ],
  },
  {
    title: "Tools & Workflow",
    subtitle: "How I ship projects like a real dev team.",
    category: "tools",
    skills: [
      { skill: "JavaScript (ES6+)", level: "95%", icon: <SiJavascript className="text-yellow-300" /> },
      { skill: "Git", level: "90%", icon: <SiGit className="text-orange-400" /> },
      { skill: "GitHub", level: "90%", icon: <SiGithub className="text-gray-100" /> },
      { skill: "Deployment (Vercel)", level: "80%", icon: <SiVercel className="text-gray-100" /> },
    ],
  },
];

const RESUME_ROUTE = "/resume";

// --- MAIN ABOUT PAGE ---
const AboutPage = () => {
  return (
    <motion.div
      layout
      className="container mx-auto max-w-5xl p-4 md:p-10"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* --- SECTION 1: BIO & PHOTO --- */}
      <motion.div
        className="mb-20 flex flex-col items-center gap-8 md:mb-24 md:flex-row"
        variants={sectionVariants}
      >
        {/* Avatar with subtle glow ring */}
        <div className="relative">
          <div className="absolute -inset-2 -z-10 rounded-full bg-blue-500/20 blur-3xl" />
          <motion.img
            src="https://placehold.co/400x400/1e3a8a/ffffff?text=AT"
            alt="Aayush Tripathi"
            className="h-48 w-48 rounded-full border-4 border-gray-700 object-cover shadow-2xl md:h-64 md:w-64"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 28px rgba(96, 165, 250, 0.65)",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Text Block */}
        <div className="flex flex-1 flex-col text-center md:text-left">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Hi, I'm Aayush Tripathi.
          </h1>

          <p className="mb-4 text-lg leading-relaxed text-gray-300 md:text-xl">
            I&apos;m a full-stack developer focused on the{" "}
            <span className="font-semibold text-blue-400">MERN stack</span>. I
            design and build end-to-end experiences – from reliable backend
            APIs to polished, animated frontends that actually feel great to
            use.
          </p>

          {/* Little “role chips” row */}
          <div className="mb-6 flex flex-wrap justify-center gap-2 md:justify-start">
            <span className="rounded-full bg-blue-900/40 px-3 py-1 text-xs font-medium text-blue-200">
              Full-Stack MERN Developer
            </span>
            <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-gray-200">
              Performance & UX Focused
            </span>
            <span className="rounded-full bg-emerald-900/40 px-3 py-1 text-xs font-medium text-emerald-200">
              Problem Solver
            </span>
          </div>

          {/* Icon list */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <BrainCircuit className="h-5 w-5 flex-shrink-0 text-blue-400" />
              <span className="text-sm text-gray-300 md:text-base">
                I enjoy breaking down complex problems into simple, shippable
                solutions.
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <Layers className="h-5 w-5 flex-shrink-0 text-blue-400" />
              <span className="text-sm text-gray-300 md:text-base">
                Comfortable across the stack – MongoDB, Express, React, and
                Node.js.
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <Sparkles className="h-5 w-5 flex-shrink-0 text-blue-400" />
              <span className="text-sm text-gray-300 md:text-base">
                I care about details: smooth animations, clear UX, and clean
                code.
              </span>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="mt-2 flex flex-col justify-center gap-4 md:flex-row md:justify-start">
            {/* View Resume (primary) */}
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(96, 165, 250, 0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <Link
                to={RESUME_ROUTE}
                className="inline-flex items-center justify-center gap-2 rounded-lg 
                           bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl
                           transition duration-300 ease-in-out hover:bg-blue-700 md:text-base"
              >
                <FileText className="h-5 w-5" />
                View Resume
              </Link>
            </motion.div>

            {/* See My Work (secondary) */}
            <motion.div
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            >
              <Link
                to="/work"
                className="inline-flex items-center justify-center gap-2 rounded-lg 
                           border border-blue-400 px-6 py-3 text-sm font-semibold 
                           text-blue-400 transition-colors duration-300 
                           hover:bg-blue-900/40 hover:text-blue-300 md:text-base"
              >
                See my work
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <hr className="my-10 border-gray-700/70" />

      {/* --- SECTION 2: WHAT I BUILD --- */}
      <motion.div className="mb-20 md:mb-24" variants={sectionVariants}>
        <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-blue-300/80">
          What I Do
        </h2>
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
          What I Build
        </h2>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ValueCard
            icon={<Monitor className="mb-1 h-8 w-8 text-blue-400" />}
            title="Frontend Experiences"
            description="Responsive, accessible, and visually engaging interfaces using React, Tailwind CSS, and animation libraries."
          />
          <ValueCard
            icon={<Database className="mb-1 h-8 w-8 text-blue-400" />}
            title="Backend APIs"
            description="Clean, maintainable REST APIs with Node.js & Express, wired to MongoDB for reliable data storage."
          />
          <ValueCard
            icon={<Layers className="mb-1 h-8 w-8 text-blue-400" />}
            title="Full-Stack Systems"
            description="From idea to deployment, I design and connect every layer of the MERN stack for real-world products."
          />
        </motion.div>
      </motion.div>

      <hr className="my-10 border-gray-700/70" />

      {/* --- SECTION 3: MY TECH STACK (CINEMATIC FULL-STACK PANEL) --- */}
      <motion.div className="mb-16" variants={sectionVariants}>
        <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-blue-300/80">
          Tech Stack
        </h2>
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
          My Core Technologies
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-gray-400 md:text-base">
          A full-stack skillset focused on building{" "}
          <span className="text-blue-300">MERN applications</span> – from
          interactive frontends to scalable APIs and production-ready workflows.
        </p>

        {/* Full-stack grouped panel */}
        <div className="space-y-10">
          {skillGroups.map((group) => (
            <motion.section
              key={group.title}
              variants={gridContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl border border-gray-800/80 bg-slate-950/60 
                         p-5 shadow-inner shadow-black/40 md:p-6"
            >
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white md:text-xl">
                    {group.title}
                  </h3>
                  <p className="text-xs text-gray-400 md:text-sm">
                    {group.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-start gap-2 md:justify-end">
                  <span className="rounded-full bg-gray-800/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-gray-300">
                    Full-Stack Focus
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
                {group.skills.map((s) => (
                  <SkillOrb
                    key={s.skill}
                    skill={s.skill}
                    level={s.level}
                    category={group.category}
                    icon={s.icon}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
