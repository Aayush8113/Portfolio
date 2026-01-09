import axios from 'axios';

// 1. Create Axios Instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // Timeout after 10 seconds to prevent hanging requests
  timeout: 10000, 
});

// 2. Request Interceptor (Logger & Auth Placeholder)
api.interceptors.request.use(
  (config) => {
    // In the future, if you add login, you can inject tokens here:
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    
    // Dev Logger
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor (Global Error Handler)
api.interceptors.response.use(
  (response) => {
    // Automatically unwrap the 'data' property so components are cleaner
    // Before: response.data.data
    // After: response.data
    return response;
  },
  (error) => {
    // Handle standard backend error format
    const errorMessage = 
      error.response?.data?.message || 
      error.message || 
      "Something went wrong";

    console.error('❌ API Error:', errorMessage);

    // Optional: You could trigger a global toast notification here
    // toast.error(errorMessage);

    return Promise.reject({ ...error, message: errorMessage });
  }
);

export default api;