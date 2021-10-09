<template>
  <q-layout view="hHh lpR fFf">
    <header-bar @menu-click="toggleLeftDrawer" />
    <left-menu v-model="leftDrawerOpen" v-if="loggedIn" />

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { getters } from '../store/types';
import headerBar from '../components/Header.vue';
import leftMenu from '../components/LeftMenu.vue';

export default {

  components: { leftMenu, headerBar },
  setup() {
    const store = useStore();
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      loggedIn: computed(() => store.getters[getters.loggedIn]),
    };
  },
};
</script>
