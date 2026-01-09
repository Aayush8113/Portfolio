import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  ArrowLeft,
  Cpu,
  Power,
  ShieldAlert,
  Terminal,
  WifiOff,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useScifiSound } from "../context/SoundContext";

// --- 🎨 STYLES (Scoped Glitch Effect) ---
const GlitchStyles = () => (
  <style>{`
    @keyframes glitch-anim-1 {
      0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
      20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
      40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
      60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
      80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
      100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
    }
    .glitch-text { position: relative; display: inline-block; }
    .glitch-text::before, .glitch-text::after {
      content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: #020617;
    }
    .glitch-text::before {
      left: 3px; text-shadow: -2px 0 #ef4444; clip-path: inset(0 0 0 0);
      animation: glitch-anim-1 2s infinite linear alternate-reverse;
    }
    .glitch-text::after {
      left: -3px; text-shadow: -2px 0 #3b82f6; clip-path: inset(0 0 0 0);
      animation: glitch-anim-1 3s infinite linear alternate-reverse;
    }
  `}</style>
);

// --- 🧩 SUB-COMPONENTS ---

const TerminalOutput = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="relative w-full max-w-lg p-4 mb-12 overflow-hidden font-mono text-xs text-left border rounded-lg shadow-2xl bg-black/50 border-slate-800 sm:text-sm group"
  >
    {/* Scanline Overlay */}
    <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20 animate-[scan_2s_linear_infinite]" />

    <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <Terminal className="w-3 h-3 text-slate-500" />
        <span className="text-slate-500">diagnostic_log.sys</span>
      </div>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-slate-700" />
        <div className="w-2 h-2 rounded-full bg-slate-700" />
      </div>
    </div>

    <div className="space-y-1.5 font-mono">
      <p className="text-slate-400">
        <span className="text-emerald-500">➜</span> Initiating protocol...
      </p>
      <p className="text-slate-400">
        <span className="text-emerald-500">➜</span> Targeting:{" "}
        <span className="text-red-400">/undefined_sector</span>
      </p>
      <p className="text-red-400">
        <span className="text-red-500">✖</span> ERROR: Null pointer exception.
      </p>
      <p className="text-red-400">
        <span className="text-red-500">✖</span> FATAL: Route map corrupted.
      </p>
      <p className="mt-2 text-blue-400 animate-pulse">
        _ Waiting for manual override...
      </p>
    </div>
  </motion.div>
);

const ActionButtons = ({ sound, navigate }) => (
  <div className="flex flex-col justify-center w-full gap-4 sm:flex-row">
    <button
      onClick={() => {
        sound.playClick();
        navigate(-1);
      }}
      onMouseEnter={sound.playHover}
      className="relative w-full px-8 py-4 overflow-hidden transition-all border rounded-lg group bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300 sm:w-auto hover:text-white"
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-bold tracking-widest uppercase">
          Trace Back
        </span>
      </div>
    </button>

    <Link
      to="/"
      onClick={sound.playClick}
      onMouseEnter={sound.playHover}
      className="group relative w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-lg overflow-hidden transition-all shadow-[0_0_30px_rgba(239,68,68,0.4)]"
    >
      {/* Shimmer */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

      <div className="relative z-10 flex items-center justify-center gap-2">
        <Power className="w-4 h-4" />
        <span className="text-sm font-bold tracking-widest uppercase">
          System Reboot
        </span>
      </div>
    </Link>
  </div>
);

// --- 🚀 MAIN PAGE ---
const NotFoundPage = () => {
  const navigate = useNavigate();
  const sound = useScifiSound(); // Using the Global Context
  const containerRef = useRef(null);

  // Optimized Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY }) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  useEffect(() => {
    // Play error sound on mount (once)
    const timer = setTimeout(() => sound.playError(), 500);
    return () => clearTimeout(timer);
  }, [sound]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#020617] overflow-hidden text-slate-200 cursor-crosshair group select-none"
      onMouseMove={handleMouseMove}
    >
      <GlitchStyles />

      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Red Spotlight */}
      <motion.div
        className="absolute transition duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(239, 68, 68, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-6 text-center">
        {/* 1. TOP WARNING */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3 px-4 py-2 rounded-full bg-red-950/30 border border-red-500/50 text-red-400 font-mono text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(239,68,68,0.2)]"
        >
          <WifiOff className="w-4 h-4 animate-pulse" />
          <span>Connection Lost: 404</span>
        </motion.div>

        {/* 2. GLITCH TITLE */}
        <div className="relative mb-8">
          <h1
            className="text-[100px] sm:text-[180px] font-black leading-none text-white glitch-text tracking-tighter mix-blend-screen"
            data-text="404"
            aria-label="404 Error"
          >
            404
          </h1>
          <div className="absolute w-[120%] h-px bg-red-500/50 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 blur-[1px]" />
        </div>

        {/* 3. TERMINAL */}
        <TerminalOutput />

        {/* 4. CONTROLS */}
        <ActionButtons sound={sound} navigate={navigate} />
      </div>

      {/* 5. FOOTER STATUS */}
      <div className="absolute left-0 right-0 flex justify-center opacity-50 bottom-8">
        <div className="flex items-center gap-8 text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em]">
          <span className="flex items-center gap-2">
            <ShieldAlert className="w-3 h-3" /> Sector Unmapped
          </span>
          <span className="flex items-center hidden gap-2 sm:flex">
            <Cpu className="w-3 h-3" /> Mem_Leak_Detected
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
