<template>
  <q-page padding>
    <div class="status-container">
      <q-badge color="green" rounded class="q-mr-sm" />Online
    </div>
    <div class="tanks-container">
        <tank :fullness="device.feed" type="feed" />
        <tank :fullness="device.water" type="water" />
        <tank :fullness="device.charge" type="charge" />
    </div>
    <div class="controls-container">
      <q-btn class="q-mt-md" color="primary">Feed now</q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { notifyInfo } from 'src/common/notification';
import routeNames from '../router/routeNames';
import { getters } from '../store/types';
import Tank from '../components/Tank.vue';

export default defineComponent({
  name: 'Dasboard',
  components: { Tank },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    if (!route.params.deviceId) {
      notifyInfo('Please choose device to go to the dashboard');
      router.push({ name: routeNames.devices });
    }

    return {
      device: computed(() => store.getters[getters.getDeviceById](route.params.deviceId) ?? {}),
    };
  },
});
</script>

<style lang="scss" scoped>
  .tanks-container {
    display: flex;
    justify-content: start;
    gap: 1rem;
    margin-bottom: 20px;
  }

  .status-container {
    margin-bottom: 20px;
  }
</style>
