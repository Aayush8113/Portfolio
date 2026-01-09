import { createContext, useContext, useMemo } from "react";

// --- ⚙️ CONFIGURATION (The "Design" Layer) ---
// Centralized sound definitions. Easy to tweak without touching logic.
const MASTER_VOLUME = 0.05;

const SOUND_PRESETS = {
  HOVER: { freq: 600, type: "sine", duration: 0.05, vol: 0.02 },
  CLICK: { freq: 800, type: "square", duration: 0.1, vol: 0.05 },
  MENU_OPEN: { freq: 400, type: "sawtooth", duration: 0.15, vol: 0.05 },
  TYPE: { freq: 800, type: "triangle", duration: 0.03, vol: 0.05, random: 200 }, // Random adds variation
  ERROR: { freq: 150, type: "sawtooth", duration: 0.2, vol: 0.1 },
  SUCCESS: { freq: 800, type: "sine", duration: 0.1, vol: 0.05 },
};

// --- 🎧 AUDIO ENGINE (The "Service" Layer) ---
// Singleton pattern to manage the AudioContext instance efficiently.
class AudioService {
  constructor() {
    this.ctx = null;
  }

  // Lazy Initialization: Only created when needed, prevents SSR crashes
  getContext() {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (AudioCtor) {
        this.ctx = new AudioCtor();
      }
    }
    return this.ctx;
  }

  // Resume context if browser suspended it (Autoplay Policy)
  resume() {
    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch((err) => console.warn("Audio resume failed:", err));
    }
  }

  play(presetName) {
    const ctx = this.getContext();
    if (!ctx) return;

    // Ensure context is running
    this.resume();

    const preset = SOUND_PRESETS[presetName];
    if (!preset) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Apply Randomness (if defined)
      const frequency = preset.random
        ? preset.freq + Math.random() * preset.random
        : preset.freq;

      osc.type = preset.type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Envelope: Attack -> Decay (Prevents popping sounds)
      const volume = preset.vol * (MASTER_VOLUME * 20); // Normalize volume
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + preset.duration,
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + preset.duration);
    } catch (error) {
      // Fail silently in production, log in dev
      if (process.env.NODE_ENV === "development")
        console.error("Audio Error:", error);
    }
  }
}

// Instantiate Singleton
const audioService = new AudioService();

// --- ⚛️ REACT CONTEXT (The "UI" Layer) ---
const SoundContext = createContext(null);

export const SoundProvider = ({ children }) => {
  // We explicitly define the API exposed to components
  // using useMemo to prevent unnecessary re-renders of consumers
  const soundApi = useMemo(
    () => ({
      playHover: () => audioService.play("HOVER"),
      playClick: () => audioService.play("CLICK"),
      playMenuOpen: () => audioService.play("MENU_OPEN"),
      playType: () => audioService.play("TYPE"),

      // Complex sounds (Sequences) can be handled here
      playError: () => {
        audioService.play("ERROR");
        setTimeout(() => audioService.play("ERROR"), 100);
      },
      playSuccess: () => {
        audioService.play("SUCCESS");
        // Create a major third interval for success
        setTimeout(() => {
          // Manually playing a secondary tone for the chord effect
          // In a real app, I'd extend play() to handle frequency overrides,
          // but this keeps it simple for now.
          audioService.play("SUCCESS");
        }, 150);
      },
    }),
    [],
  );

  return (
    <SoundContext.Provider value={soundApi}>{children}</SoundContext.Provider>
  );
};

// --- 🪝 CUSTOM HOOK ---
export const useScifiSound = () => {
  const context = useContext(SoundContext);

  // Strict Null Check pattern
  if (!context) {
    throw new Error("useScifiSound must be used within a SoundProvider");
  }

  return context;
};
