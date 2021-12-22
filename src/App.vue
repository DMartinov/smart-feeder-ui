<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ApiError from 'src/exceptions/ApiError';
import routeNames from 'src/router/routeNames';
import { actions } from './store/types';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const router = useRouter();

    store.dispatch(actions.init).catch((error) => {
      if (error instanceof ApiError && error.status === 401) {
        router.push({ name: routeNames.login });
      } else {
        throw error;
      }
    });
  },
});
</script>
