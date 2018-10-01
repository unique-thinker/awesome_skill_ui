<template>
  <section class="hero has-background-light is-fullheight">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <div class="box">
        <h3 class="title">Reset password</h3>
          <form @submit.prevent='passwordReset'>
            <b-message v-if='success.success' type='is-success'>
              <p>{{ success.message }}</p>
            </b-message>
            <b-message v-if="errors == ''? false : !errors.success" type='is-danger'>
              <p v-for='(message, index) in errors.errors' :key='index'>{{ message }}</p>
            </b-message>
            <b-field label='Email'
              :type="$v.email.$error ? 'is-danger' : ''"
              :message="$v.email.email? '': 'Please enter an valid email.'">
              <b-input type='email'
                v-model.trim.lazy='$v.email.$model'
                placeholder='Email'
                icon="envelope"
                rounded>
              </b-input>
            </b-field>
            <div class='field'>
              <p class='control'>
                <button
                  class='button is-primary is-medium is-fullwidth is-rounded'
                  type='submit'
                  :disabled="$v.email.$invalid">
                  Send password reset email
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import formValidations from '@/mixins/validations/Form';

export default {
  data() {
    return {
      email: '',
      success: '',
      errors: '',
    };
  },
  mixins: [formValidations],
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
