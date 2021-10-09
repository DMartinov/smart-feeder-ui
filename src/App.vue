<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { actions } from './store/types';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    store.dispatch(actions.init);
  },
});
</script>
