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
};

export const mutations = {
  setUserDevices: 'setUserDevices',
  setUser: 'setUser',
  setUsers: 'setUsers',
  setLoading: 'setLoading',
};

export const getters = {
  getDeviceById: 'getDeviceById',
  isLoggedIn: 'isLoggedIn',
  isLoading: 'isLoading',
};
