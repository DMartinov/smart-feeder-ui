import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';
import { parseJwt } from 'src/common/utils';
import { mutations, actions, getters } from './types';
import deviceApi from '../api/deviceApi';
import userApi from '../api/userApi';
import authApi from '../api/authApi';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

function getJwtPayload(token) {
  try {
    return parseJwt(token);
  } catch {
    return null;
  }
}

export default store((/* { ssrContext } */) => {
  const Store = createStore({
    state() {
      return {
        /** @typedef {Object} user
         * @property {String} id
         * @property {String} email
         * @property {String} name
         * @property {String} role
         * @property {Array} array of device ids
        */
        userIdentity: getJwtPayload(localStorage.accessToken),
        /** @typedef {Array} array of user devices
         * @property {String} id
         * @property {String} email
         * @property {String} name
         * @property {String} role
         * @property {Array} devices
        */
        users: [],
        devices: [],
        loader: { isLoading: false, action: null },
      };
    },
    mutations: {
      [mutations.setUserDevices](state, devices) {
        state.devices = devices ?? [];
      },
      [mutations.setUserIdentity](state, user) {
        state.userIdentity = user;
      },
      [mutations.setUsers](state, users) {
        state.users = users ?? [];
      },
      [mutations.setLoading](state, { isLoading, action }) {
        state.loader = { isLoading, action };
      },
    },
    getters: {
      [getters.getDeviceById]: (state) => (id) => state.devices?.find((device) => device.id === id),
      [getters.isLoading]: (state) => (action) => state.loader.isLoading
                                                  && state.loader.action === action,
      [getters.isLoggedIn]: (state) => state.userIdentity != null,
      [getters.userRole]: (state) => state.userIdentity?.role,
    },
    actions: {
      async [actions.init]({ dispatch }) {
        if (!localStorage.accessToken) return;

        const user = await dispatch(actions.checkAuth);
        if (user) {
          await dispatch(actions.getUserDevices);
        }
      },

      async [actions.getUserDevices]({ commit }) {
        const devices = await deviceApi.getUserDevices();
        commit(mutations.setUserDevices, devices);
      },

      async [actions.addDevice]({ commit, dispatch }, { name, login, password }) {
        commit(mutations.setLoading, { isLoading: true, action: actions.addDevice });

        try {
          await deviceApi.addDevice({ name, login, password });
          await dispatch(actions.getUserDevices);
        } finally {
          commit(mutations.setLoading, { isLoading: false });
        }
      },

      async [actions.logIn]({ commit, dispatch }, { email, password }) {
        commit(mutations.setLoading, { isLoading: true, action: actions.logIn });
        try {
          const response = await authApi.logIn(email, password);
          localStorage.accessToken = response.accessToken;
          commit(mutations.setUserIdentity, response.user);
          await dispatch(actions.init);
        } finally {
          commit(mutations.setLoading, { isLoading: false });
        }
      },

      async [actions.signUp]({ commit, dispatch }, { name, password, activationId }) {
        commit(mutations.setLoading, { isLoading: true, action: actions.signUp });
        try {
          const response = await authApi.signUp(name, password, activationId);
          localStorage.accessToken = response.accessToken;
          commit(mutations.setUserIdentity, response.user);
          await dispatch(actions.init);
        } finally {
          commit(mutations.setLoading, { isLoading: false });
        }
      },

      async [actions.sendRegistrationLink]({ commit, dispatch }, { email, deviceId = null }) {
        commit(mutations.setLoading, { isLoading: true, action: actions.sendRegistrationLink });
        try {
          await userApi.sendRegistrationLink(email, deviceId);
          await dispatch(actions.getUsers);
        } finally {
          commit(mutations.setLoading, { isLoading: false });
        }
      },

      async [actions.deleteUser]({ commit, dispatch }, id) {
        commit(mutations.setLoading, { isLoading: true, action: actions.deleteUser });
        try {
          await userApi.deleteUser(id);
          await dispatch(actions.getUsers);
        } finally {
          commit(mutations.setLoading, { isLoading: false });
        }
      },

      async [actions.deleteDevice]({ commit, dispatch }, id) {
        commit(mutations.setLoading, { isLoading: true, action: actions.deleteDevice });
        try {
          await deviceApi.deleteDevice(id);
          await dispatch(actions.getUserDevices);
        } finally {
          commit(mutations.setLoading, { isLoading: false });
        }
      },

      async [actions.blockDeviceUser]({ commit, dispatch }, { deviceId, userId, blocked }) {
        commit(mutations.setLoading, { isLoading: true, action: actions.blockDeviceUser });
        try {
          await deviceApi.blockUser(deviceId, userId, blocked);
          await dispatch(actions.getUserDevices);
        } finally {
          commit(mutations.setLoading, { isLoading: false });
        }
      },

      async [actions.checkAuth]({ commit }) {
        try {
          const accessToken = await authApi.refresh();
          if (!accessToken) return null;

          localStorage.accessToken = accessToken;
          const userData = getJwtPayload(accessToken);
          commit(mutations.setUserIdentity, userData);
          return userData;
        } catch (ex) {
          commit(mutations.setUserIdentity, null);
          throw ex;
        }
      },

      async [actions.getUsers]({ commit }) {
        commit(mutations.setLoading, { isLoading: true, action: actions.getUsers });
        try {
          const users = await userApi.getUsers();
          commit(mutations.setUsers, users);
        } finally {
          commit(mutations.setLoading, { isLoading: false });
        }
      },

      async [actions.logOut]({ commit }) {
        commit(mutations.setLoading, { isLoading: true, action: actions.logOut });
        try {
          await authApi.logOut();
          localStorage.removeItem('accessToken');
          commit(mutations.setUserIdentity, null);
        } finally {
          commit(mutations.setLoading, { isLoading: false });
        }
      },
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
