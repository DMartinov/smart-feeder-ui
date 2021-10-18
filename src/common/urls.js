const userBaseUrl = 'user';
const usersBaseUrl = 'users';
const deviceBaseUrl = 'device';
const historyBaseUrl = 'history';
const deviceLogBaseUrl = 'device-log';
const scheduleBaseUrl = 'schedule';

export default {
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
  },
  history: {
    index: historyBaseUrl,
  },
  deviceLog: {
    index: deviceLogBaseUrl,
  },
  schedule: {
    index: scheduleBaseUrl,
  },
  users: {
    index: usersBaseUrl,
  },
};
