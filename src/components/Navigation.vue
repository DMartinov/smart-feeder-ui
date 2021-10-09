<template>
  <q-list>
    <template v-for="(menuItem, index) in navMenuList" :key="index">
      <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
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
import { defineComponent } from 'vue';
import { navMenuList } from '../common/types';

export default defineComponent({
  setup() {
    return { navMenuList };
  },
});
</script>

<style>

</style>
