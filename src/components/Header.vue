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
        <q-btn v-if="loggedIn" flat>Sign out</q-btn>
      </q-toolbar>
    </q-header>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { getters } from '../store/types';

export default defineComponent({
  emits: ['menu-click'],
  setup(props, context) {
    const store = useStore();

    return {
      leftDrawerClick() {
        context.emit('menu-click');
      },
      loggedIn: computed(() => store.getters[getters.loggedIn]),
    };
  },
});
</script>

<style>

</style>
