import { apiUrls as url } from '../common/urls';
import { get, post } from './apiClient';

export default {
  async getUsers() {
    return get(url.user.getUsers);
  },

  sendRegistrationLink(email, deviceId) {
    return post(url.user.sendRegistrationLink, { email, deviceId });
  },

  deleteUser(id) {
    return post(url.user.deleteUser, { id });
  },
};
