<template>
    <q-page padding>
        <div class="row justify-center items-center">
            <div class="col-md-4 col-xs-10">
                <login-form />
            </div>
        </div>
    </q-page>
</template>

<script>
import loginForm from '../components/LoginForm.vue';

export default {
  components: { loginForm },
};
</script>

<style lang="scss" scoped>
.login-container {
    display: flex;
    align-items: center;
}

</style>
