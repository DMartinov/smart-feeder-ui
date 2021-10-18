<template>
    <q-page padding>
        <!-- <div class="login-container"> -->
            <div class="row justify-center items-center">
                <div class="col-md-4 col-xs-10">
                    <sign-up-form />
                </div>
            </div>
        <!-- </div> -->

    </q-page>
</template>

<script>
import signUpForm from '../components/SignUpForm.vue';

export default {
  components: { signUpForm },
};
</script>

<style lang="scss" scoped>
.login-container {
    display: flex;
    align-items: center;
}

</style>
