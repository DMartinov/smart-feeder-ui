<template>
  <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftDrawerClick" />
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/bone-folded-icon_30406.png">
          </q-avatar>
          Smart Feeder
        </q-toolbar-title>
        <div class="username">{{ username }}</div>
        <q-btn v-if="loggedIn" flat @click="signOut">Sign out</q-btn>
      </q-toolbar>
    </q-header>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import routeNames from '../router/routeNames';
import { getters, actions } from '../store/types';

export default defineComponent({
  emits: ['menu-click'],
  setup(props, context) {
    const store = useStore();
    const router = useRouter();

    return {
      leftDrawerClick() {
        context.emit('menu-click');
      },
      async signOut() {
        await store.dispatch(actions.logOut);
        router.push({ name: routeNames.login });
      },
      loggedIn: computed(() => store.getters[getters.isLoggedIn]),
      username: computed(() => store.state.user?.name),
    };
  },
});
</script>

<style lang="scss" scoped>
  .username {
    flex: 1 1 0%;
    font-size: 1.25rem;
  }
</style>
