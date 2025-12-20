import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

// --- LAZY LOAD PAGES (Performance Boost) ---
// The browser will only download these files when needed.
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Simple Loading Spinner for transitions
const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-600 border-t-blue-500" />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const handleAnimationComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onAnimationComplete={handleAnimationComplete} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100 font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="flex-grow">
        {/* Suspense shows the PageLoader while the chunk is downloading */}
        <Suspense fallback={<PageLoader />}>
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
      </main>

      <Footer />
    </div>
  );
}

export default App;