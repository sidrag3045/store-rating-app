import apiClient from './api';

export const getAdminDashboardStats = async () => {
  try {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllUsers = async (params = {}) => {
  try {
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllStoresForAdmin = async (params = {}) => {
  try {
    const response = await apiClient.get('/admin/stores', { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/admin/users', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createStore = async (storeData) => {
  try {
    const response = await apiClient.post('/stores', storeData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};