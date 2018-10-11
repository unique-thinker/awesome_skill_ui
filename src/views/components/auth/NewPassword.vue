<template>
  <section class="hero has-background-light is-fullheight">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <div class="box">
        <h3 class="title has-text-grey">New Password</h3>
          <form @submit.prevent='changePassword'>
            <b-message v-if="success != ''" type='is-success'>
              <p>{{ success }}</p>
            </b-message>
            <b-message v-if="errors != ''" type='is-danger'>
              <p
                v-for='(message, index) in errors.full_messages'
                :key='index'>
                {{ message }}
              </p>
            </b-message>
            <b-field label='Password'
              :type="$v.password.$error ? 'is-warning' : ''"
              :message="$v.password.minLen?
                '': 'Password must have at least 6 characters.'">
              <b-input type='password'
                  v-model.trim.lazy='$v.password.$model'
                  placeholder='Password'
                  icon="lock"
                  rounded
                  password-reveal>
              </b-input>
            </b-field>
            <b-field label='Confirm password'
              :type="$v.passwordConfirmation.$error ? 'is-warning' : ''"
              :message="$v.passwordConfirmation.minLen?
                '': 'Password must have at least 6 characters.'">
              <b-input type='password'
                  v-model.trim.lazy='$v.passwordConfirmation.$model'
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
                  type='submit'
                  :disabled="$v.password.$invalid || $v.passwordConfirmation.$invalid">
                  Change password
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

const msg = 'Your password has been successfully updated.';

export default {
  data() {
    return {
      password: '',
      passwordConfirmation: '',
      success: '',
      errors: '',
    };
  },
  mixins: [formValidations],
  methods: {
    ...mapActions({
      authNewPassword: 'authNewPassword',
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
        .then(() => {
          this.success = msg;
          this.errors = '';
          setTimeout(() => { this.$router.push('/login'); }, 5000);
        })
        .catch((err) => { this.errors = err.response.data.errors; this.success = ''; });
    },
  },
};
</script>
