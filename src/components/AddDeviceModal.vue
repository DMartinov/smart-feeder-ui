<template>
<q-dialog @hide="close" v-model="show">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add device</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md" @submit="create">
               <q-input
                    v-model="name"
                    filled
                    type="text"
                    label="Name"
                    lazy-rules
                    :error="hasError('name')"
                    :error-message="errorMessage('name')"
                    :rules="nameRules"
                />
                <q-input
                    v-model="login"
                    filled
                    type="text"
                    label="Device login"
                    lazy-rules
                    :error="hasError('name')"
                    :error-message="errorMessage('name')"
                />
                <q-input
                    v-model="password"
                    filled
                    label="Device password"
                    :type="isPwd ? 'password' : 'text'"
                    lazy-rules
                    :error="hasError('password')"
                    :error-message="errorMessage('password')"
                >
                    <template v-slot:append>
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                        />
                    </template>
                </q-input>
            <q-btn type="submit"
                :loading="loading"
                :disable="loading"
                color="primary"
                label="Create device"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import ApiError from '../exceptions/ApiError';
import { actions, getters } from '../store/types';
import { notifySuccess, notifyError } from '../common/notification';

export default {
  emits: ['close'],
  setup(props, context) {
    const isPwd = ref(true);
    const name = ref('');
    const login = ref('');
    const password = ref('');
    const errors = ref(null);
    const show = ref(true);

    const store = useStore();

    // TODO: add hook
    const hasError = (fieldName) => {
      if (errors.value != null) {
        return errors.value.some((error) => error.param === fieldName);
      }

      return false;
    };

    // TODO: add hook
    const errorMessage = (fieldName) => {
      if (errors.value != null) {
        const error = errors.value.find((e) => e.param === fieldName);
        return error?.msg;
      }

      return null;
    };

    const create = async () => {
      try {
        await store.dispatch(actions.addDevice,
          {
            name: name.value,
            login: login.value,
            password: password.value,
          });

        notifySuccess('Device successfully created');
        context.emit('close');
      } catch (error) {
        if (error instanceof ApiError) {
          notifyError(error.message);
          errors.value = error.errors;
        }
      }
    };

    const close = () => context.emit('close');

    return {
      isPwd,
      show,
      name,
      login,
      password,
      nameRules: [
        (val) => val?.length >= 3 || 'Name must be more than 3 characters',
        (val) => val?.length < 30 || 'Name must be less than 30 characters',
      ],
      hasError,
      errorMessage,
      loading: computed(() => store.getters[getters.isLoading](actions.addDevice)),
      create,
      close,
    };
  },

};
</script>

<style>

</style>
