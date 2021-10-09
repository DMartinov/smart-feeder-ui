const apiUrl = 'http://localhost:9000';

const userBaseUrl = `${apiUrl}/user`;
const deviceBaseUrl = `${apiUrl}/device`;

export default {
  user: {
    logIn: `${userBaseUrl}/login`,
    sendRegistrationLink: `${userBaseUrl}/sendRegistrationLink`,
    signUp: `${userBaseUrl}/signUp`,
    logOut: `${userBaseUrl}/logOut`,
    refresh: `${userBaseUrl}/refresh`,
    getUsers: `${userBaseUrl}/getUsers`,
  },
  device: {
    getDevices: `${deviceBaseUrl}/getDevices`,
    update: `${deviceBaseUrl}/updateDevice`,
    add: `${deviceBaseUrl}/add`,
    updateState: `${deviceBaseUrl}/updateState`,
    setCommand: `${deviceBaseUrl}/setCommand`,
  },
};
