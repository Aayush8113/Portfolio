// // /frontend/tailwind.config.js (Ensuring Animation Blocks are Removed)

// /** @type {import('tailwindcss').Config} */
// import colors from 'tailwindcss/colors'; 
// import defaultTheme from 'tailwindcss/defaultTheme'; 

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Inter', ...defaultTheme.fontFamily.sans],
//       },
//       colors: {
//         primary: {
//           50: '#eff6ff',
//           100: '#dbeafe',
//           200: '#bfdbfe',
//           300: '#93c5fd',
//           400: '#60a5fa', 
//           500: '#3b82f6',
//           600: '#2563eb', 
//           700: '#1d4ed8',
//           800: '#1e40af',
//           900: '#1e3a8a',
//           950: '#172554',
//         },
//         gray: colors.gray,
//         blue: colors.blue,
//         red: colors.red,
//         green: colors.green,
//       },
//       // KEYFRAMES AND ANIMATION BLOCKS MUST BE ABSENT HERE
//     },
//   },
//   plugins: [
//     require('@tailwindcss/forms'),
//     require('@tailwindcss/typography'),
//   ],
// }







// /frontend/tailwind.config.js (Enhanced for Premium Effects)

/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'; 
import defaultTheme from 'tailwindcss/defaultTheme'; 

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      
      // BRAND COLOR PALETTE (Kept for consistency)
      colors: {
        brand: colors.indigo, 
        accent: colors.cyan,  
        gray: colors.gray,
        slate: colors.slate,
        red: colors.red,
      },

      // 💥 NEW: Custom Pulse Animation (Slower, Premium Feel)
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // 💥 NEW: Custom Drop Shadow for Text/Logo Polish
      dropShadow: {
        'strong-glow': '0 0 18px rgba(129, 140, 248, 0.75)',
      },
      
      // CUSTOM UTILITIES (Conic Gradient Glow)
      backgroundImage: {
        'conic-logo-glow': 'conic-gradient(from 180deg at 50% 50%, rgba(79, 70, 229, 0.4) 0deg, rgba(34, 211, 238, 0.4) 180deg, rgba(79, 70, 229, 0.4) 360deg)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}