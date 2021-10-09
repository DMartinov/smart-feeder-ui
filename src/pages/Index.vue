<template>
  <q-page padding>
    <div class="row">
      <div class="col-1">
        <q-badge color="green" rounded class="q-mr-sm" />Online
        <q-btn class="q-mt-md">Feed now</q-btn>
    </div>
    <div class="col">
      <div class="row">
        <div class="col">
          <tank :fullness="device.charge" color="green" />
        </div>
        <div class="col">
          <tank :fullness="device.feed" color="blue" />
        </div>
        <div class="col">
          <tank :fullness="device.water" color="brown" />
        </div>
      </div>
    </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { getters } from '../store/types';
import Tank from '../components/Tank.vue';

export default defineComponent({
  name: 'Dasboard',
  components: { Tank },
  setup() {
    const store = useStore();
    return {
      device: computed(() => store.getters[getters.getDeviceById](1) ?? {}),
    };
  },
});
</script>
