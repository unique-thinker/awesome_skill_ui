<template>
  <div>
    <div class='container'>
      <div class='columns is-centered'>
        <form class='card is-rounded' @submit.prevent='passwordReset'>
          <div class='card-content'>
            <h1 class='title'>Reset your password</h1>
            <b-message v-if='success.success' type='is-success'>
              <p>{{ success.message }}</p>
            </b-message>
            <b-message v-if="errors == ''? false : !errors.success" type='is-danger'>
              <p v-for='(message, index) in errors.errors' :key='index'>{{ message }}</p>
            </b-message>
            <b-field label='Email'>
              <b-input type='email'
                v-model='email'
                placeholder='Email'
                icon="envelope"
                rounded>
              </b-input>
            </b-field>
            <div class='field'>
              <p class='control'>
                <button
                  class='button is-primary is-medium is-fullwidth is-rounded'
                  type='submit'>
                  Send password reset email
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
      email: '',
      success: '',
      errors: '',
    };
  },
  methods: {
    ...mapActions({
      authPasswordReset: 'AUTH_PASSWORD_RESET',
    }),
    passwordReset() {
      const resetPasswordData = {
        email: this.email,
        redirect_url: 'http://localhost:8080/new_password',
      };
      this.authPasswordReset(resetPasswordData)
        .then((resp) => { this.success = resp; this.errors = ''; })
        .catch((err) => { this.errors = err; this.success = ''; });
    },
  },
};
</script>
