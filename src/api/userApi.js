import axios from 'axios';
import url from '../common/urls';
import { parseJwt } from '../common/utils';
import { get, post } from '../common/apiClient';

export default {
  async logIn(email, password) {
    const response = await post(url.user.logIn, { email, password });
    const userData = parseJwt(response);

    return { accessToken: response, user: userData };
  },

  async logOut() {
    return get(url.user.logOut);
  },

  async getUsers() {
    return get(url.user.getUsers);
  },

  sendRegistrationLink(email) {
    return post(url.user.sendRegistrationLink, { email });
  },

  async signUp(name, password, activationId) {
    const response = await post(url.user.signUp, { name, password, activationId });
    const userData = parseJwt(response);

    return { accessToken: response, user: userData };
  },

  async refresh() {
    const response = await axios.get(`${process.env.API_URL}/${url.user.refresh}`, { withCredentials: true });
    return response.data;
  },

  deleteUser(id) {
    return post(url.user.deleteUser, { id });
  },
};
