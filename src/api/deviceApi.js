import { get, post } from 'src/api/apiClient';
import { apiUrls as url } from '../common/urls';

export default {
  async getUserDevices() {
    return get(url.device.getDevices);
  },

  async addDevice({ name, login, password }) {
    return post(url.device.add, { name, login, password });
  },

  async deleteDevice(id) {
    return post(url.device.delete, { id });
  },

  async blockUser(deviceId, userId, blocked) {
    return post(url.device.blockUser, { deviceId, userId, blocked });
  },
};
