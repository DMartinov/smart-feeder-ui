<template>
  <q-form class="q-gutter-md" @submit="signUp">
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
        v-model="password"
        filled
        label="Password"
        :type="isPwd ? 'password' : 'text'"
        lazy-rules
        :error="hasError('password')"
        :error-message="errorMessage('password')"
        :rules="passwordRules">
            <template v-slot:append>
                <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                />
            </template>
    </q-input>
    <q-btn type="submit" :loading="loading" :disable="loading" color="primary" label="Sign up" />
  </q-form>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import useErrorHandling from 'src/hooks/useErrorHandling';
import useValidationRules from 'src/hooks/useValidationRules';
import routeNames from '../router/routeNames';
import ApiError from '../exceptions/ApiError';
import { actions, getters } from '../store/types';
import { notifyError } from '../common/notification';

export default {
  setup() {
    const isPwd = ref(true);
    const password = ref('');
    const name = ref('');

    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { errors, errorMessage, hasError } = useErrorHandling();
    const { passwordRules, nameRules } = useValidationRules();

    const signUp = async () => {
      try {
        const { activationId } = route.query;
        await store.dispatch(actions.signUp, {
          name: name.value,
          password: password.value,
          activationId,
        });

        router.push({ name: routeNames.dashboard });
      } catch (error) {
        if (error instanceof ApiError) {
          notifyError(error.message);
          errors.value = error.errors;
        }
      }
    };

    return {
      isPwd,
      password,
      name,
      passwordRules,
      nameRules,
      hasError,
      errorMessage,
      loading: computed(() => store.getters[getters.isLoading](actions.signUp)),
      signUp,
    };
  },
};
</script>

<style>

</style>
