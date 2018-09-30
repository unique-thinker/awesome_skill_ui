<template>
  <div>
    <div class='container'>
      <div class='columns is-centered'>
        <form class='card is-rounded' @submit.prevent='changePassword'>
          <div class='card-content'>
            <h1 class='title'>New Password</h1>
            <b-message v-if='success.success' type='is-success'>
              <p>{{ success.message }}</p>
            </b-message>
            <b-message v-if="errors == ''? false : !errors.success" type='is-danger'>
              <p
                v-for='(message, index) in errors.errors.full_messages'
                :key='index'>
                {{ message }}
              </p>
            </b-message>
            <b-field label='Password'>
              <b-input type='password'
                  v-model='password'
                  placeholder='Password'
                  icon="lock"
                  rounded
                  password-reveal>
              </b-input>
            </b-field>
            <b-field label='Confirm password'>
              <b-input type='password'
                  v-model='passwordConfirmation'
                  placeholder='Password'
                  icon="lock"
                  rounded
                  password-reveal>
              </b-input>
            </b-field>
            <div class='field'>
              <p class='control'>
                <button
                  class='button is-primary is-medium is-fullwidth is-rounded'
                  type='submit'>
                  Change password
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      password: '',
      passwordConfirmation: '',
      success: '',
      errors: '',
    };
  },
  methods: {
    ...mapActions({
      authNewPassword: 'AUTH_NEW_PASSWORD',
    }),
    changePassword() {
      const headerParams = this.$router.currentRoute.query;
      const newPasswordData = {
        newPassword: {
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        },
        headers: headerParams,
      };
      this.authNewPassword(newPasswordData)
        .then((resp) => {
          this.success = resp;
          this.errors = '';
          setTimeout(() => { this.$router.push('/login'); }, 5000);
        })
        .catch((err) => { this.errors = err; this.success = ''; });
    },
  },
};
</script>
