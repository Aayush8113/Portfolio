import axios from 'axios';

// 1. Create an Axios instance
const api = axios.create({
  // This automatically uses the Vercel URL in production, or localhost in development
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;