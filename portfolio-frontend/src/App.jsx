// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader'; // <- make sure file name matches!

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ContactPage from './pages/ContactPage';
import ResumePage from './pages/ResumePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  // Show preloader initially
  const [isLoading, setIsLoading] = useState(true);

  const handleAnimationComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onAnimationComplete={handleAnimationComplete} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-gray-100">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Core Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:id" element={<ProjectDetailPage />} />

          {/* Functional Routes */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resume" element={<ResumePage />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
