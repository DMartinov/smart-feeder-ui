import axios from 'axios';
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
    const response = await axios.get(`${process.env.API_URL}/${url.auth.refresh}`, { withCredentials: true });
    return response.data;
  },
};
