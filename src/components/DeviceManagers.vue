<template>
    <div v-for="user in deviceUsers" :key="user.id" class="row items-center">
        <div class="col-10">{{ user.name }}</div>
        <div class="col">
            <q-btn v-if="user.blocked"
                round
                flat
                size="sm"
                color="secondary"
                icon="lock_open"
                :loading="loading"
                :disable="loading"
                @click="blockUser(user.id, false)"
            >
                <q-tooltip>
                    Unblock user
                </q-tooltip>
            </q-btn>
            <q-btn v-else
                round
                flat
                size="sm"
                color="deep-orange"
                icon="block"
                @click="blockUser(user.id, true)"
             >
                <q-tooltip>
                    Block user
                </q-tooltip>
            </q-btn>
        </div>
    </div>
    <div class="row justify-end">
        <div class="col-2">
            <q-btn round
                flat
                size="sm"
                color="primary"
                icon="person_add"
                @click="openAddManagerModal=true"
            />
        </div>
    </div>
    <invite-device-manager-modal
        :deviceId="deviceId"
        v-if="openAddManagerModal"
        @close="openAddManagerModal=false"
    />
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import ApiError from '../exceptions/ApiError';
import { notifySuccess, notifyError } from '../common/notification';
import { actions, getters } from '../store/types';
import InviteDeviceManagerModal from './InviteDeviceManagerModal.vue';

export default {
  components: { InviteDeviceManagerModal },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    deviceId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const openAddManagerModal = ref(false);

    return {
      deviceUsers: computed(() => props.users),
      openAddManagerModal,
      loading: computed(() => store.getters[getters.isLoading](actions.blockDeviceUser)),
      async blockUser(userId, isBlocked) {
        try {
          await store.dispatch(actions.blockDeviceUser, { userId, deviceId: props.deviceId, blocked: isBlocked });
          const message = `The user is ${isBlocked ? '' : 'un'}blocked from using this device`;
          notifySuccess(message);
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
