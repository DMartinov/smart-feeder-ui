import axios from 'axios';
import ApiError from '../exceptions/ApiError';
import { apiUrls as urls } from '../common/urls';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use((config) => config, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && originalRequest?.isRetry) {
    originalRequest.isRetry = true;
    try {
      // update access token
      const response = await axios.get(`${process.env.API_URL}/${urls.auth.refresh}`, { withCredentials: true });
      localStorage.accessToken = response.accessToken;
      return api.request(originalRequest);
    } catch {
      console.log('Not authorized');
    }
  }
  throw error;
});

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
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
};

export const post = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
};
