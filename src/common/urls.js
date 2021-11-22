const userBaseUrl = 'user';
const deviceBaseUrl = 'device';
// const historyBaseUrl = 'history';
// const deviceLogBaseUrl = 'device-log';
// const scheduleBaseUrl = 'schedule';

export const apiUrls = {
  user: {
    logIn: `${userBaseUrl}/login`,
    sendRegistrationLink: `${userBaseUrl}/sendRegistrationLink`,
    signUp: `${userBaseUrl}/signUp`,
    logOut: `${userBaseUrl}/logOut`,
    refresh: `${userBaseUrl}/refresh`,
    getUsers: `${userBaseUrl}/getUsers`,
    deleteUser: `${userBaseUrl}/delete`,
  },
  device: {
    getDevices: `${deviceBaseUrl}/getDevices`,
    update: `${deviceBaseUrl}/updateDevice`,
    add: `${deviceBaseUrl}/add`,
    updateState: `${deviceBaseUrl}/updateState`,
    setCommand: `${deviceBaseUrl}/setCommand`,
    delete: `${deviceBaseUrl}/delete`,
  },

};

export const link = {
  device: {
    index: '/device',
  },
  history: {
    index: '/history',
  },
  deviceLog: {
    index: '/device-log',
  },
  schedule: {
    index: '/schedule',
  },
  users: {
    index: '/users',
  },
};
