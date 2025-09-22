import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // backend's base URL
  withCredentials: true, // For sending cookies
});

export default apiClient;