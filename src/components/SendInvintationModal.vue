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
import useErrorHandling from 'src/hooks/useErrorHandling';
import useValidationRules from 'src/hooks/useValidationRules';
import ApiError from '../exceptions/ApiError';
import { actions, getters } from '../store/types';
import { notifySuccess, notifyError } from '../common/notification';

export default {
  emits: ['close'],
  setup(props, context) {
    const email = ref('');
    const show = ref(true);

    const store = useStore();
    const { errors, errorMessage, hasError } = useErrorHandling();
    const { emailRules } = useValidationRules();

    const close = () => context.emit('close');

    return {
      show,
      email,
      emailRules,
      hasError,
      errorMessage,
      loading: computed(() => store.getters[getters.isLoading](actions.sendRegistrationLink)),
      close,
      async sendInvintation() {
        try {
          await store.dispatch(actions.sendRegistrationLink, { email: email.value });
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
