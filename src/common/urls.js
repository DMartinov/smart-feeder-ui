const userBaseUrl = 'user';
const authBaseUrl = 'auth';
const deviceBaseUrl = 'device';
// const historyBaseUrl = 'history';
// const deviceLogBaseUrl = 'device-log';
// const scheduleBaseUrl = 'schedule';

export const apiUrls = {
  auth: {
    signUp: `${authBaseUrl}/signUp`,
    logIn: `${authBaseUrl}/login`,
    logOut: `${authBaseUrl}/logOut`,
    refresh: `${authBaseUrl}/refresh`,
  },
  user: {
    sendRegistrationLink: `${userBaseUrl}/sendRegistrationLink`,
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
    blockUser: `${deviceBaseUrl}/block-user`,
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
