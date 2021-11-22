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
import routeNames from '../router/routeNames';
import ApiError from '../exceptions/ApiError';
import { actions, getters } from '../store/types';
import { notifyError } from '../common/notification';

export default {
  setup() {
    const isPwd = ref(true);
    const password = ref('');
    const name = ref('');
    const errors = ref(null);

    const store = useStore();
    const router = useRouter();
    const route = useRoute();

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
      passwordRules: [(val) => (val != null && val.length > 8) || 'Please use minimum 8 characters'],
      nameRules: [
        (val) => val?.length >= 3 || 'Name must be more than 3 characters',
        (val) => val?.length < 30 || 'Name must be less than 30 characters',
      ],
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
