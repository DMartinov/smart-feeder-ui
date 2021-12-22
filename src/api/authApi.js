import axios from 'axios';
import ApiError from 'src/exceptions/ApiError';
import { apiUrls as url } from '../common/urls';
import { parseJwt } from '../common/utils';
import { get, post } from './apiClient';

export default {
  async logIn(email, password) {
    const response = await post(url.auth.logIn, { email, password });
    const userData = parseJwt(response);

    return { accessToken: response, user: userData };
  },

  async logOut() {
    return get(url.auth.logOut);
  },

  async signUp(name, password, activationId) {
    const response = await post(url.auth.signUp, { name, password, activationId });
    const userData = parseJwt(response);

    return { accessToken: response, user: userData };
  },

  async refresh() {
    try {
      const response = await axios.get(`${process.env.API_URL}/${url.auth.refresh}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw ApiError.UnauthorizedError();
      }

      throw error;
    }
  },
};
