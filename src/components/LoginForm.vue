<template>
<q-form class="q-gutter-md" @submit="logIn">
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
    <q-input
      v-model="password"
      filled
      label="Password"
      :type="isPwd ? 'password' : 'text'"
      lazy-rules
    >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn type="submit" :loading="loading" :disable="loading" color="primary" label="Log in" />
</q-form>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import routeNames from '../router/routeNames';
import ApiError from '../exceptions/ApiError';
import { actions, getters } from '../store/types';
import { isValidEmail } from '../common/utils';
import { notifyError } from '../common/notification';

export default defineComponent({
  setup() {
    const isPwd = ref(true);
    const password = ref('');
    const email = ref('');
    const errors = ref(null);

    const store = useStore();
    const router = useRouter();

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

    const logIn = async () => {
      try {
        await store.dispatch(actions.logIn, { email: email.value, password: password.value });
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
      email,
      emailRules: [
        (val) => (val != null && isValidEmail(val)) || 'Invalid email',
      ],
      logIn,
      hasError,
      errorMessage,
      loading: computed(() => store.getters[getters.isLoading](actions.logIn)),
    };
  },
});
</script>

<style>

</style>
