import axios from 'axios';
import ApiError from '../exceptions/ApiError';

export const getApiError = (error) => {
  const response = error?.response;

  if (!response) return error;

  if (response.status === 400) {
    return new ApiError(response.data?.message, response.data?.errors);
  }
  return new ApiError(response?.data?.message);
};

export const get = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
};

export const post = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
};
