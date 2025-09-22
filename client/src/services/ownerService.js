import apiClient from './api';

export const getOwnerDashboard = async () => {
  try {
    const response = await apiClient.get('/owner/dashboard');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};