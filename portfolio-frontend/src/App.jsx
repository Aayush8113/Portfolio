import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { AlertTriangle } from "lucide-react";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// Core Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";

// --- LAZY LOADED ROUTES ---
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ResumePage = lazy(() => import("./pages/ResumePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// --- 🪝 UTILS & HOOKS ---

// 1. Scroll To Top Hook (Runs only on route change)
const useScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
};

// 2. Custom Cursor (Memoized for Performance)
const CustomCursor = memo(() => {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
      const target = e.target;
      setIsHovering(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button"),
      );
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden lg:flex items-center justify-center mix-blend-difference"
      style={{ x: cursorX, y: cursorY }}
    >
      <motion.div
        animate={{ scale: isHovering ? 2.5 : 1, opacity: isHovering ? 0.8 : 1 }}
        className={`rounded-full border border-white bg-white transition-colors duration-200 ${isHovering ? "bg-opacity-10" : ""}`}
        style={{ width: "8px", height: "8px" }}
      />
    </motion.div>
  );
});

// 3. Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("System Failure:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] text-white">
          <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
          <h2 className="text-xl font-bold tracking-widest uppercase">
            System Critical Error
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 mt-6 text-red-500 transition-colors border border-red-500 hover:bg-red-500/10"
          >
            HARD REBOOT
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// 4. Loading Fallback (For Route Switching)
const PageLoader = () => (
  <div className="flex min-h-[80vh] items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500 rounded-full border-t-transparent animate-spin" />
  </div>
);

// --- 🏗️ MAIN LAYOUT (Wraps content AFTER Preloader) ---
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-slate-200 selection:bg-blue-500/30 selection:text-white">
      {/* Global Background */}
      <div className="fixed inset-0 z-[-1] bg-[#020617]">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <CustomCursor />
      <Navbar />
      <main className="relative flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

// --- 🚀 APP ROOT ---
function App() {
  const location = useLocation();
  useScrollToTop(); // Handle scroll on route change

  // ⚡️ STATE: System Ready?
  // This state resets ONLY on page refresh (F5).
  // It stays 'true' when you navigate using Links.
  const [isSystemReady, setSystemReady] = useState(false);

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {/* CONDITION 1: PRELOADER (Shows on first load/refresh) */}
        {!isSystemReady ? (
          <Preloader
            key="preloader"
            onAnimationComplete={() => setSystemReady(true)}
          />
        ) : (
          /* CONDITION 2: MAIN APP (Shows after preloader finishes) */
          <MainLayout key="main-interface">
            <Suspense fallback={<PageLoader />}>
              {/* Internal Route Animations */}
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/work/:id" element={<ProjectDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/resume" element={<ResumePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </MainLayout>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;
