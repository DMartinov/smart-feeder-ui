<template>
<q-page padding>
    <q-table
      title="Users"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      row-key="name"
    >
      <template v-slot:top>
          <q-btn color="primary"
            :disable="loading"
            label="Add new device"
            @click="openModal=true"
          />
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
      </template>
      <template v-slot:body-cell-users="props">
          <q-td :props="props">
            <device-managers :users="props.row.users" :deviceId="props.row.id"/>
          </q-td>
      </template>
      <template v-slot:body-cell-dashboard="props">
          <q-td :props="props">
            <router-link :to="getDashboardUrl(props.row.id)">Dashboard</router-link>
          </q-td>
      </template>
      <template v-slot:body-cell-delete="props">
          <q-td :props="props">
            <q-btn
            color="negative"
            icon-right="delete"
            no-caps
            flat
            dense
            @click="deleteDevice(props.row.id)"
          />
          </q-td>
      </template>
    </q-table>
    <add-device-modal v-if="openModal" @close="openModal=false" />
 </q-page>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import AddDeviceModal from 'src/components/AddDeviceModal.vue';
import DeviceManagers from '../components/DeviceManagers.vue';
import routeNames from '../router/routeNames';
import ApiError from '../exceptions/ApiError';
import { notifySuccess, notifyError } from '../common/notification';
import { actions, getters } from '../store/types';

const columns = [
  {
    name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true,
  },
  {
    name: 'users', label: 'Users', align: 'left', field: 'users',
  },
  {
    name: 'dashboard', label: 'Dashboard', align: 'left', field: 'dashboard',
  },
  {
    name: 'id', align: 'left', label: 'id', field: 'id', sortable: true,
  },
  {
    name: 'delete', label: 'Delete', field: 'delete',
  },
];
export default {
  components: { AddDeviceModal, DeviceManagers },
  setup() {
    const store = useStore();

    const filter = ref('');
    const openModal = ref(false);

    // store.dispatch(actions.getUserDevices);

    const deleteDevice = async (id) => {
      try {
        await store.dispatch(actions.deleteDevice, id);
        notifySuccess('Device deleted');
      } catch (error) {
        if (error instanceof ApiError) {
          notifyError(error.message);
        }
      }
    };

    const getDashboardUrl = (id) => ({ name: routeNames.dashboard, params: { deviceId: id } });

    return {
      openModal,
      filter,
      columns,
      rows: computed(() => store.state.devices),
      loading: computed(() => store.getters[getters.isLoading](actions.getUserDevices)),
      deleteDevice,
      getDashboardUrl,
    };
  },
};
</script>

<style>

</style>
