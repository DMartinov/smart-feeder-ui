import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';
import { mutations, actions, getters } from './types';
import deviceApi from '../api/deviceApi';
import userApi from '../api/userApi';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const Store = createStore({
    state() {
      return {
        /** @typedef {Object} user
         * @property {Number} id
         * @property {Number} email
         * @property {String} name
         * @property {Boolean} role
         * @property {Array} array of device ids
        */
        user: null,
        /** @typedef {Array} array of user devices
         * @property {Number} id
         * @property {Number} email
         * @property {String} name
         * @property {Boolean} role
         * @property {Array} devices
        */
        devices: [],
        initialized: false,
        loader: { isLoading: false, action: null },
      };
    },
    mutations: {
      [mutations.setUserDevices](state, devices) {
        state.devices = devices;
      },
      [mutations.setInitialized](state) {
        state.initialized = true;
      },
      [mutations.setUser](state, user) {
        state.user = user;
      },
      [mutations.setLoading](state, { isLoading, action }) {
        state.loader = { isLoading, action };
      },
    },
    getters: {
      [getters.getDeviceById]: (state) => (id) => state.devices?.find((device) => device.id === id),
      [getters.isLoading]: (state) => (action) => state.loader.isLoading
                                                  && state.loader.action === action,
      [getters.isLoggedIn]: (state) => state.user != null,
    },
    actions: {
      async [actions.init]({ commit, dispatch }) {
        const getUserDevices = dispatch(actions.getUserDevices);
        await Promise.all([getUserDevices]);
        commit(mutations.setInitialized);
      },
      async [actions.getUserDevices]({ commit }) {
        const devices = await deviceApi.getUserDevices();
        commit(mutations.setUserDevices, devices);
      },
      async [actions.logIn]({ commit }, { email, password }) {
        commit(mutations.setLoading, { isLoading: true, action: actions.logIn });
        try {
          const response = await userApi.logIn(email, password);
          localStorage.accessToken = response.accessToken;
          commit(mutations.setUser, response.user);
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
