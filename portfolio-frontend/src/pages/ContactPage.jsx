import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Clock,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  Terminal,
  Wifi,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import ContactForm from "../components/ContactForm";

// --- ⚙️ CONFIGURATION ---
const CONFIG = {
  LOCATION: {
    city: "Ahmedabad, IN",
    timezone: "Asia/Kolkata",
    label: "HQ_COORDINATES",
  },
  TERMINAL_LOGS: [
    { text: "Initializing secure handshake...", color: "text-slate-400" },
    { text: "Resolving host: aayush.dev...", color: "text-blue-400" },
    { text: "Encryption: AES-256-GCM enabled", color: "text-emerald-400" },
    { text: "Channel OPEN. Waiting for transmission...", color: "text-white" },
  ],
  SOCIALS: [
    {
      id: "email",
      label: "aayushtripathi.tech",
      sub: "SMTP Protocol",
      icon: Mail,
      href: "mailto:aayushtripathi.tech@gmail.com",
      style: "text-blue-400 border-blue-500/50",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      sub: "Professional Net",
      icon: Linkedin,
      href: "https://linkedin.com/in/aayushtripathi081103",
      style: "text-indigo-400 border-indigo-500/50",
    },
    {
      id: "github",
      label: "GitHub",
      sub: "Source Code",
      icon: Github,
      href: "https://github.com/Aayush8113",
      style: "text-white border-slate-500/50",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      sub: "VoIP Encrypted",
      icon: FaWhatsapp,
      href: "https://wa.me/+919737759381",
      style: "text-emerald-400 border-emerald-500/50",
    },
  ],
};

// --- 🧩 SUB-COMPONENTS ---

// 1. Precision Clock (IST)
const LiveClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: CONFIG.LOCATION.timezone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono tabular-nums">{time}</span>;
};

// 2. Animated Terminal
const TerminalWindow = () => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let timeouts = [];
    CONFIG.TERMINAL_LOGS.forEach((log, index) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, log]);
      }, index * 800); // Staggered delay
      timeouts.push(timeout);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-xl border border-slate-800 bg-[#020617] overflow-hidden shadow-2xl group">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-slate-900/50 border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-slate-500" />
          <span className="text-[10px] font-mono text-slate-400">
            root@system:~
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 border rounded-full bg-red-500/20 border-red-500/50" />
          <div className="w-2 h-2 border rounded-full bg-amber-500/20 border-amber-500/50" />
          <div className="w-2 h-2 border rounded-full bg-emerald-500/20 border-emerald-500/50" />
        </div>
      </div>
      {/* Terminal Body */}
      <div className="p-4 h-32 flex flex-col justify-end font-mono text-xs space-y-1.5">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-emerald-500 text-[10px]">➜</span>
            <span className={line.color}>{line.text}</span>
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-1.5 h-3 bg-blue-500 block"
        />
      </div>
    </div>
  );
};

// 3. Location Widget
const LocationCard = () => (
  <div className="flex items-center gap-4 p-4 border rounded-xl border-slate-800 bg-slate-900/40 backdrop-blur-sm">
    <div className="relative flex items-center justify-center w-12 h-12 border rounded-full bg-slate-950 border-slate-800">
      <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping opacity-20" />
      <Globe className="w-5 h-5 text-blue-400" />
    </div>
    <div>
      <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">
        {CONFIG.LOCATION.label}
      </p>
      <div className="flex items-center gap-3">
        <h3 className="text-slate-200 font-bold text-sm flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-emerald-400" /> {CONFIG.LOCATION.city}
        </h3>
        <div className="w-px h-3 bg-slate-700" />
        <p className="text-slate-400 text-xs flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-emerald-400" /> <LiveClock />
        </p>
      </div>
    </div>
  </div>
);

// 4. Connection Link Card
const ConnectionCard = ({ data }) => {
  const Icon = data.icon;
  return (
    <a
      href={data.href}
      target="_blank"
      rel="noreferrer"
      className={`group flex items-center gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800 hover:bg-slate-900/60 transition-all duration-300 hover:border-opacity-100 ${data.style.split(" ")[1]}`} // Use border color class
    >
      <div
        className={`w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:scale-110 transition-transform ${data.style.split(" ")[0]}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
          {data.sub}
        </p>
        <p className="font-bold transition-colors text-slate-200 group-hover:text-white">
          {data.label}
        </p>
      </div>
      <ExternalLink className="w-4 h-4 transition-transform text-slate-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
};

// --- 🚀 MAIN PAGE ---
const ContactPage = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.main
      className="relative min-h-[calc(100vh-80px)] bg-[#020617] text-slate-200 py-12 md:py-24 overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Interactive Spotlight */}
      <motion.div
        className="absolute transition duration-300 opacity-0 pointer-events-none bg-blue-500/10 -inset-px group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.10), transparent 80%)`,
        }}
      />

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 border rounded-full bg-blue-900/10 border-blue-500/20 backdrop-blur-md"
          >
            <Wifi className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-emerald-400">
              Uplink Established
            </span>
          </motion.div>

          <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-7xl">
            INITIATE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              PROTOCOL
            </span>
          </h1>
          <p className="max-w-xl mx-auto font-mono text-sm text-slate-400 md:text-base">
            SECURE CHANNEL OPEN. TRANSMIT PROJECT DATA OR ESTABLISH DIRECT
            CONNECTION.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          {/* LEFT COLUMN: COMMAND CENTER */}
          <div className="space-y-8 lg:col-span-5">
            <TerminalWindow />
            <LocationCard />

            <div className="pt-4 space-y-4">
              <h3 className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest uppercase text-slate-500">
                <Cpu className="w-4 h-4" /> Direct Connections
              </h3>

              {/* Render Primary Email separately for emphasis */}
              <ConnectionCard data={CONFIG.SOCIALS[0]} />

              <div className="grid grid-cols-2 gap-4">
                {CONFIG.SOCIALS.slice(1).map((social) => (
                  <ConnectionCard key={social.id} data={social} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM WRAPPER */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-slate-800 bg-[#0f172a]/60 backdrop-blur-xl p-1 shadow-2xl">
              {/* Form HUD Header */}
              <div className="bg-[#020617]/80 px-6 py-4 flex items-center justify-between border-b border-slate-800 rounded-t-xl">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-600" />
                    <span className="w-2 h-2 rounded-full bg-slate-600" />
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    SEND_MESSAGE.EXE
                  </span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 border rounded bg-emerald-950/30 border-emerald-900/50">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">
                    Encrypted
                  </span>
                </div>
              </div>

              {/* Form Container */}
              <div className="relative p-6 md:p-8">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                <div className="relative z-10">
                  <div className="mb-8">
                    <h2 className="flex items-center gap-2 mb-2 text-xl font-bold text-white">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      Transmit Data
                    </h2>
                    <div className="w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 to-transparent" />
                  </div>

                  {/* The Actual Form Component */}
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default ContactPage;
