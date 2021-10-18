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
            label="Send invintation"
            @click="openModal=true"
          />
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
      </template>
      <template v-slot:body-cell-delete="props">
          <q-td :props="props">
            <q-btn
            color="negative"
            icon-right="delete"
            no-caps
            flat
            dense
            @click="deleteUser(props.row.id)"
          />
          </q-td>
      </template>
    </q-table>
    <send-invintation-modal v-if="openModal" @close="openModal=false" />
 </q-page>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import SendInvintationModal from 'src/components/SendInvintationModal.vue';
import ApiError from '../exceptions/ApiError';
import { notifySuccess, notifyError } from '../common/notification';
import { actions, getters } from '../store/types';

const columns = [
  {
    name: 'id', align: 'center', label: 'id', field: 'id', sortable: true,
  },
  {
    name: 'name', label: 'Name', field: 'name', sortable: true,
  },
  {
    name: 'email', label: 'Email', field: 'email', sortable: true,
  },
  {
    name: 'role', label: 'Role', field: 'role', sortable: true,
  },
  {
    name: 'devices', label: 'Devices', field: 'devices', sortable: true,
  },
  {
    name: 'delete', label: 'Delete', field: 'delete',
  },
];

export default {
  components: { SendInvintationModal },
  setup() {
    const store = useStore();
    const filter = ref('');
    const openModal = ref(false);

    store.dispatch(actions.getUsers);

    return {
      openModal,
      filter,
      columns,
      rows: computed(() => store.state.users ?? []),
      loading: computed(() => store.getters[getters.isLoading]),
      async deleteUser(id) {
        try {
          await store.dispatch(actions.deleteUser, id);
          notifySuccess('User deleted');
        } catch (error) {
          if (error instanceof ApiError) {
            notifyError(error.message);
          }
        }
      },
    };
  },
};
</script>

<style>

</style>
