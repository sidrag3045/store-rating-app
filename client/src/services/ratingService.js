import apiClient from './api';

export const submitRating = async (storeId, ratingData) => {
  try {
    const response = await apiClient.post(`/stores/${storeId}/ratings`, ratingData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};