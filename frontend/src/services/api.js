import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchSales = async (params) => {
  try {
    const response = await api.get('/sales', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};

export const fetchFilterOptions = async () => {
  try {
    const response = await api.get('/sales/filters');
    return response.data;
  } catch (error) {
    console.error('Error fetching filters:', error);
    throw error;
  }
};

export default api;