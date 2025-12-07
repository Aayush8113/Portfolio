import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedSection component for Scroll-Reveal effects.
 * Wraps content and animates it into view when scrolled to.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to be animated.
 * @param {number} [props.delay=0] - Stagger delay before the animation starts (in seconds).
 * @param {number} [props.yOffset=40] - The starting offset distance on the Y-axis (e.g., 40px down).
 * @param {number} [props.duration=0.9] - The duration of the visible transition (in seconds).
 * @param {number} [props.amount=0.15] - The percentage of the element that must be visible to trigger the animation.
 */
const AnimatedSection = ({ children, delay = 0, yOffset = 40, duration = 0.9, amount = 0.15 }) => {
  
  // Define the animation variants
  const sectionVariants = {
    // The "hidden" state: element is invisible and slides up from yOffset
    hidden: { 
      opacity: 0, 
      y: yOffset, 
    },
    // The "visible" state: element is fully visible at its normal position
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        // --- IMPROVED TIMING & EASING ---
        // Slower duration for a more deliberate feel, using a strong decelerate ease.
        duration: duration, 
        ease: [0.4, 0.0, 0.2, 1], // Professional decelerate ease (smooth stop)
        delay: delay, 
      }
    },
  };

  return (
    <motion.div
      className="w-full"
      // Pass the variants we defined
      variants={sectionVariants}
      // Set the initial state to 'hidden'
      initial="hidden"
      // Animate to 'visible' when it's "in view"
      whileInView="visible"
      // 'viewport' settings
      viewport={{ 
        // Amount customizable via props (default 15%)
        amount: amount, 
        once: true, // Only animate it *once* when it appears
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;