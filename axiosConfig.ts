// src/axiosConfig.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // Устанавливаем базовый URL
  withCredentials: true // Включаем передачу куки
});

export default apiClient;
