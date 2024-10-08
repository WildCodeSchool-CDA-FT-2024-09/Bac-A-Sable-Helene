import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // Optional: set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;