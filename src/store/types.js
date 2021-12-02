export const actions = {
  init: 'init',
  getUserDevices: 'getUserDevices',
  sendRegistrationLink: 'sendRegistrationLink',
  signUp: 'signUp',
  logIn: 'logIn',
  logOut: 'logOut',
  checkAuth: 'checkAuth',
  getUsers: 'getUsers',
  deleteUser: 'deleteUser',
  addDevice: 'addDevice',
  deleteDevice: 'deleteDevice',
  blockDeviceUser: 'blockDeviceUser',
};

export const mutations = {
  setUserDevices: 'setUserDevices',
  setUserIdentity: 'setUserIdentity',
  setUsers: 'setUsers',
  setLoading: 'setLoading',
};

export const getters = {
  getDeviceById: 'getDeviceById',
  isLoggedIn: 'isLoggedIn',
  isLoading: 'isLoading',
  userRole: 'userRole',
};
