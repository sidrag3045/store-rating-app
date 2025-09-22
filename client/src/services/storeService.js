import apiClient from './api';

export const getStores = async (searchParams = {}) => {
  try {
    const response = await apiClient.get('/stores/all', { params: searchParams });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};