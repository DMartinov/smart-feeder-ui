<template>
  <q-drawer show-if-above v-model="value" side="left" bordered>
      <q-scroll-area class="fit">
        <navigation />
        </q-scroll-area>
    </q-drawer>
</template>

<script>
import { defineComponent } from 'vue';
import navigation from './Navigation.vue';

export default defineComponent({
  components: { navigation },
  emits: ['update:modelValue'],
  props: ['modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
});
</script>

<style>

</style>
