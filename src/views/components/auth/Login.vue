<template>
  <section class="hero has-background-light is-fullheight">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <div class="box">
        <h3 class="title has-text-grey">Login</h3>
        <p class="subtitle has-text-grey">Please login to proceed.</p>
          <form @submit.prevent='login'>
            <b-message v-if='errors' type="is-danger">
              <p v-for='(error, index) in errors' :key='index'>{{ error }}</p>
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
            <b-field label='Password'
              :type="$v.password.$error ? 'is-warning' : ''"
              :message="$v.password.minLen? '': 'Password must have at least 6 characters.'">
              <b-input type='password'
                  v-model.trim.lazy='$v.password.$model'
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
                  :disabled="$v.email.$invalid || $v.password.$invalid">
                  Login
                </button>
              </p>
            </div>
            <p class='level-left'>Don't have an account?
              <router-link to='/signup'>SignUp</router-link>
            </p>
            <router-link to='/password_reset' class='level-left'>Forgot password?</router-link>
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
      password: '',
      errors: '',
    };
  },
  mixins: [formValidations],
  methods: {
    ...mapActions('auth', ['authLogin']),
    login() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      this.authLogin(loginData)
        .then(() => this.$router.push('/'))
        .catch((err) => { this.errors = err.response.data.errors; });
    },
  },
};
</script>
