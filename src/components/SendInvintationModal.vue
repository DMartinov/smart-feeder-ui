<template>
  <q-dialog @hide="close" v-model="show">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Send invintation</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md" @submit="sendInvintation">
            <q-input
                v-model="email"
                filled
                type="email"
                label="Email"
                lazy-rules
                :error="hasError('email')"
                :error-message="errorMessage('email')"
                :rules="emailRules"
            />
            <q-btn type="submit"
                :loading="loading"
                :disable="loading"
                color="primary"
                label="Send invintation"
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
import { isValidEmail } from '../common/utils';
import { notifySuccess, notifyError } from '../common/notification';

export default {
  emits: ['close'],
  setup(props, context) {
    const email = ref('');
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

    return {
      show,
      email,
      emailRules: [
        (val) => (val != null && isValidEmail(val)) || 'Invalid email',
      ],
      hasError,
      errorMessage,
      loading: computed(() => store.getters[getters.isLoading](actions.sendRegistrationLink)),
      close() {
        context.emit('close');
      },
      async sendInvintation() {
        try {
          await store.dispatch(actions.sendRegistrationLink, email.value);
          notifySuccess('Invintation link has been sent');
          context.close();
        } catch (error) {
          if (error instanceof ApiError) {
            notifyError(error.message);
            errors.value = error.errors;
          }
        }
      },
    };
  },

};
</script>

<style>

</style>
