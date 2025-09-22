import apiClient from './api';

export const updatePassword = async (passwordData) => {
  try {
    const response = await apiClient.put('/users/password', passwordData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};