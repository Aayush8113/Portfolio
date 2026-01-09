import {
  ArrowUpRight,
  Code,
  Cpu,
  Github,
  Globe,
  Heart,
  Linkedin,
  Mail,
  Terminal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// --- CONSTANTS ---
const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/Aayush8113",
    icon: Github,
    color: "hover:text-white",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/aayushtripathi081103",
    icon: Linkedin,
    color: "hover:text-blue-400",
  },
  {
    name: "Email",
    url: "mailto:aayushtripathi.tech@gmail.com",
    icon: Mail,
    color: "hover:text-emerald-400",
  },
];

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

// --- COMPONENTS ---

// 1. Unified Logo Component (Exact match to Navbar)
const FooterLogo = () => (
  <div className="relative flex items-center gap-3 cursor-pointer group">
    {/* Icon Container */}
    <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden transition-transform border shadow-2xl rounded-xl bg-slate-950 border-slate-800 group-hover:scale-105">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(56,189,248,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
      <span className="z-10 text-sm font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-300">
        AT
      </span>
    </div>

    {/* Text Info */}
    <div>
      <h3 className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">
        Aayush Tripathi
      </h3>
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          Full Stack Architect
        </p>
      </div>
    </div>
  </div>
);

// 2. Live Server Clock (Fixed to India/Kolkata Time)
const ServerClock = () => {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Force Timezone to Asia/Kolkata (IST)
      const options = {
        timeZone: "Asia/Kolkata",
        hour12: false, // 24-hour format looks more "Server-like"
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setTimeStr(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-[10px] text-slate-500 flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
      <Globe className="w-3 h-3 text-blue-500" />
      <span>IST: {timeStr}</span>
    </div>
  );
};

// 3. Cyber Background
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
  </div>
);

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#020617] border-t border-slate-800 pt-16 pb-8 overflow-hidden">
      <GridBackground />

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        {/* --- TOP SECTION: GRID LAYOUT --- */}
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-12">
          {/* COL 1: IDENTITY (Span 5) */}
          <div className="space-y-6 md:col-span-5">
            <Link to="/" className="inline-block">
              <FooterLogo />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Architecting scalable MERN ecosystems and immersive digital
              experiences. Focused on performance, security, and pixel-perfect
              UI.
            </p>

            <div className="flex items-center gap-4">
              <ServerClock />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/30 border border-emerald-900/50">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400"></span>
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                  System Online
                </span>
              </div>
            </div>
          </div>

          {/* COL 2: NAVIGATION (Span 3) */}
          <div className="md:col-span-3">
            <h4 className="flex items-center gap-2 mb-6 text-sm font-bold tracking-widest text-white uppercase">
              <Terminal className="w-4 h-4 text-blue-500" /> Directory
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm transition-colors group text-slate-400 hover:text-blue-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: CONNECT (Span 4) */}
          <div className="md:col-span-4">
            <h4 className="flex items-center gap-2 mb-6 text-sm font-bold tracking-widest text-white uppercase">
              <Cpu className="w-4 h-4 text-purple-500" /> Neural Link
            </h4>
            <div className="grid gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 transition-all duration-300 border rounded-lg group bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded bg-slate-950 text-slate-400 ${social.color} transition-colors`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium transition-colors text-slate-300 group-hover:text-white">
                        {social.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: TERMINAL STYLE --- */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 border-t border-slate-800 md:flex-row">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-slate-500">
            <Code className="w-3 h-3 text-blue-500 sm:w-4 sm:h-4" />
            <span>
              Built with <span className="text-slate-300">React</span> +{" "}
              <span className="text-slate-300">Tailwind</span> +{" "}
              <span className="text-slate-300">Framer Motion</span>
            </span>
          </div>

          <p className="text-[10px] sm:text-xs font-mono text-slate-600">
            © {new Date().getFullYear()} Aayush Tripathi.{" "}
            <span className="text-slate-500">All Systems Operational.</span>
          </p>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-slate-500">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500/20 animate-pulse" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
