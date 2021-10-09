// import { get } from './deviceApi';
// import url from '../common/urls';

export default {
  async getUserDevices() {
    return new Promise((resolve) => (resolve([{
      id: 1,
      name: 'Spyke',
      status: 'Online',
      command: null,
      commandState: null,
      message: null,
      charge: 56,
      feed: 70,
      water: 85,
    }])));
  },
};
