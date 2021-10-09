export const actions = {
  init: 'init',
  getUserDevices: 'getUserDevices',
  logIn: 'logIn',
  getUser: 'getUser',
};

export const mutations = {
  setUserDevices: 'setUserDevices',
  setUser: 'setUser',
  setInitialized: 'setInitialized',
  setLoading: 'setLoading',
};

export const getters = {
  getDeviceById: 'getDeviceById',
  isLoggedIn: 'isLoggedIn',
  isLoading: 'isLoading',
};
