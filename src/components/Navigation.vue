<template>
  <q-list>
    <template v-for="(menuItem, index) in navMenuList" :key="index">
      <q-item :to="menuItem.link" clickable :active="menuItem.label === 'Outbox'" v-ripple>
        <q-item-section avatar>
          <q-icon :name="menuItem.icon" />
        </q-item-section>
        <q-item-section>
          {{ menuItem.label }}
        </q-item-section>
      </q-item>
      <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
    </template>
  </q-list>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { navMenuList } from '../common/types';
import { getters } from '../store/types';

export default {
  setup() {
    const store = useStore();

    return {
      navMenuList: computed(
        () => navMenuList.filter((menuItem) => menuItem.roles?.includes(store.getters[getters.userRole]) ?? true),
      ),
    };
  },
};
</script>

<style>

</style>
