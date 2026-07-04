import axios from "axios";
const API = axios.create({
  // Fallback to localhost if the VITE_API_URL variable isn't defined
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

/* =====================================
   ATTACH TOKEN
===================================== */

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default API;
