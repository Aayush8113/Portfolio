import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Cpu,
  Database,
  FileText,
  Monitor,
  Rocket,
  Terminal,
} from "lucide-react";
import { useRef } from "react";
import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { Link } from "react-router-dom";

// --- COLOR CONFIGURATION (Crucial for Tailwind JIT) ---
// We define full strings so Tailwind knows to compile these colors.
const COLOR_CONFIG = {
  sky: {
    bar: "bg-sky-500",
    border: "group-hover:border-sky-500/50",
    ringOuter: "border-sky-400",
    ringInner: "border-sky-500",
  },
  slate: {
    bar: "bg-slate-500",
    border: "group-hover:border-slate-500/50",
    ringOuter: "border-slate-400",
    ringInner: "border-slate-500",
  },
  cyan: {
    bar: "bg-cyan-500",
    border: "group-hover:border-cyan-500/50",
    ringOuter: "border-cyan-400",
    ringInner: "border-cyan-500",
  },
  pink: {
    bar: "bg-pink-500",
    border: "group-hover:border-pink-500/50",
    ringOuter: "border-pink-400",
    ringInner: "border-pink-500",
  },
  green: {
    bar: "bg-green-500",
    border: "group-hover:border-green-500/50",
    ringOuter: "border-green-400",
    ringInner: "border-green-500",
  },
  gray: {
    bar: "bg-gray-500",
    border: "group-hover:border-gray-500/50",
    ringOuter: "border-gray-400",
    ringInner: "border-gray-500",
  },
  emerald: {
    bar: "bg-emerald-500",
    border: "group-hover:border-emerald-500/50",
    ringOuter: "border-emerald-400",
    ringInner: "border-emerald-500",
  },
  blue: {
    bar: "bg-blue-500",
    border: "group-hover:border-blue-500/50",
    ringOuter: "border-blue-400",
    ringInner: "border-blue-500",
  },
  orange: {
    bar: "bg-orange-500",
    border: "group-hover:border-orange-500/50",
    ringOuter: "border-orange-400",
    ringInner: "border-orange-500",
  },
  yellow: {
    bar: "bg-yellow-500",
    border: "group-hover:border-yellow-500/50",
    ringOuter: "border-yellow-400",
    ringInner: "border-yellow-500",
  },
  white: {
    bar: "bg-white",
    border: "group-hover:border-white/50",
    ringOuter: "border-slate-200",
    ringInner: "border-white",
  },
};

// --- 3D TILT CARD (GPU Optimized) ---
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ clientX, clientY }) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX: useMotionTemplate`${mouseY.get() / 20}deg`,
        rotateY: useMotionTemplate`${mouseX.get() / -20}deg`,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl border border-slate-800 bg-[#0f172a]/90 backdrop-blur-xl transition-colors hover:border-slate-700/80 will-change-transform ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
};

// --- SKILL ORB (Fixed Logic) ---
const SkillOrb = ({ skill, level, icon, color }) => {
  // Use the config, fallback to blue if color is missing
  const styles = COLOR_CONFIG[color] || COLOR_CONFIG.blue;

  return (
    <div className="relative flex flex-col items-center justify-center p-4 group">
      <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
        {/* Outer Glow Ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-slate-800 ${styles.border} transition-colors duration-500`}
        />

        {/* Rotating Plasma Rings */}
        <motion.div
          className={`absolute inset-0 rounded-full border-t-2 ${styles.ringOuter} opacity-20`}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute inset-2 rounded-full border-b-2 ${styles.ringInner} opacity-40`}
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Icon */}
        <div className="relative z-10 text-3xl transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>

      <div className="mt-3 text-center">
        <h4 className="text-sm font-bold text-slate-200 group-hover:text-white">
          {skill}
        </h4>
        <div className="w-12 h-1 mx-auto mt-1 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: level }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-full ${styles.bar}`} // ✅ Using the mapped class here
          />
        </div>
      </div>
    </div>
  );
};

// --- STAT BADGE ---
const StatBadge = ({ value, label }) => (
  <div className="flex flex-col items-center p-3 border rounded-lg bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
    <span className="text-xl font-black text-white">{value}</span>
    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
      {label}
    </span>
  </div>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden pb-16">
      {/* --- HERO PROFILE SECTION --- */}
      <section className="relative px-6 pt-16 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

        <div className="container max-w-6xl mx-auto">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12">
            {/* LEFT: AVATAR HUD */}
            <div className="flex flex-col items-center lg:col-span-5">
              <TiltCard className="p-2 rounded-full border-2 border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                <div className="relative w-64 h-64 overflow-hidden rounded-full sm:w-80 sm:h-80 bg-slate-950">
                  {/* Avatar */}
                  <img
                    src="https://placehold.co/400x400/1e3a8a/ffffff?text=AT"
                    alt="Profile"
                    className="object-cover w-full h-full filter contrast-125"
                  />
                  {/* Scanning Laser */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent h-[10%]"
                    animate={{ top: ["-10%", "110%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </TiltCard>

              <div className="flex gap-4 mt-8">
                <StatBadge value="3+" label="Years Exp" />
                <StatBadge value="20+" label="Projects" />
                <StatBadge value="100%" label="Commitment" />
              </div>
            </div>

            {/* RIGHT: BIO DATA */}
            <div className="space-y-8 lg:col-span-7">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1 mb-4 font-mono text-xs text-blue-400 border rounded-full bg-blue-900/20 border-blue-500/30"
                >
                  <Terminal className="w-3 h-3" /> SYSTEM_IDENTITY:
                  FULL_STACK_DEV
                </motion.div>
                <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl">
                  Architecting the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    Digital Future.
                  </span>
                </h1>
                <p className="text-lg leading-relaxed text-slate-400">
                  I am a Full-Stack MERN Architect obsessed with performance and
                  scalability. I don't just write code; I engineer robust
                  systems that solve real-world problems. My mission is to
                  bridge the gap between complex backend logic and intuitive
                  frontend experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 p-4 transition-colors border bg-slate-900/50 rounded-xl border-slate-800 hover:bg-slate-900">
                  <BrainCircuit className="w-6 h-6 mt-1 text-purple-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Problem Solver
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Breaking down complex challenges into simple, shippable
                      code.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 transition-colors border bg-slate-900/50 rounded-xl border-slate-800 hover:bg-slate-900">
                  <Rocket className="w-6 h-6 mt-1 text-orange-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Performance First
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Optimizing every byte for speed and efficiency.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Link
                  to="/resume"
                  className="flex items-center gap-2 px-6 py-3 font-bold text-white transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 shadow-blue-500/20"
                >
                  <FileText className="w-4 h-4" /> Download CV
                </Link>
                <Link
                  to="/work"
                  className="flex items-center gap-2 px-6 py-3 font-bold text-white transition-all border rounded-lg bg-slate-900 border-slate-700 hover:border-slate-500"
                >
                  View Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SKILL ARSENAL --- */}
      <section className="container max-w-6xl px-6 py-16 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
            TECHNICAL ARSENAL
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400">
            A comprehensive suite of tools and technologies I use to build
            production-grade applications.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* FRONTEND PANEL */}
          <TiltCard className="p-6">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
              <Monitor className="w-6 h-6 text-sky-400" />
              <h3 className="text-lg font-bold text-white">Frontend Core</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SkillOrb
                skill="React"
                level="90%"
                color="sky"
                icon={<SiReact className="text-sky-400" />}
              />
              <SkillOrb
                skill="Next.js"
                level="85%"
                color="slate"
                icon={<SiNextdotjs className="text-white" />}
              />
              <SkillOrb
                skill="Tailwind"
                level="95%"
                color="cyan"
                icon={<SiTailwindcss className="text-cyan-400" />}
              />
              <SkillOrb
                skill="Figma"
                level="80%"
                color="pink"
                icon={<SiFigma className="text-pink-400" />}
              />
            </div>
          </TiltCard>

          {/* BACKEND PANEL */}
          <TiltCard className="p-6">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
              <Database className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">
                Backend Infrastructure
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SkillOrb
                skill="Node.js"
                level="85%"
                color="green"
                icon={<SiNodedotjs className="text-green-500" />}
              />
              <SkillOrb
                skill="Express"
                level="90%"
                color="gray"
                icon={<SiExpress className="text-white" />}
              />
              <SkillOrb
                skill="MongoDB"
                level="85%"
                color="emerald"
                icon={<SiMongodb className="text-emerald-500" />}
              />
              <SkillOrb
                skill="Docker"
                level="60%"
                color="blue"
                icon={<SiDocker className="text-blue-500" />}
              />
            </div>
          </TiltCard>

          {/* TOOLS PANEL */}
          <TiltCard className="p-6">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
              <Cpu className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-bold text-white">DevOps & Tools</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SkillOrb
                skill="Git"
                level="90%"
                color="orange"
                icon={<SiGit className="text-orange-500" />}
              />
              <SkillOrb
                skill="Postman"
                level="85%"
                color="orange"
                icon={<SiPostman className="text-orange-400" />}
              />
              <SkillOrb
                skill="Vercel"
                level="90%"
                color="white"
                icon={<SiVercel className="text-white" />}
              />
              <SkillOrb
                skill="JS (ES6+)"
                level="95%"
                color="yellow"
                icon={<SiJavascript className="text-yellow-400" />}
              />
            </div>
          </TiltCard>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
