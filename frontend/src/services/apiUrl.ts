import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_EXPENSE_SERVICE || 'http://localhost:8080'
});

export default axiosInstance;
