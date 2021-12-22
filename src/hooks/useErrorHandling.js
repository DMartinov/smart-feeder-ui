import { ref } from 'vue';

export default () => {
  const errors = ref(null);

  return {
    errors,
    hasError(fieldName) {
      if (errors.value != null) {
        return errors.value.some((error) => error.param === fieldName);
      }

      return false;
    },
    errorMessage(fieldName) {
      if (errors.value != null) {
        const error = errors.value.find((e) => e.param === fieldName);
        return error?.msg;
      }

      return null;
    },
  };
};
