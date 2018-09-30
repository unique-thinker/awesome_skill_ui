<template>
  <div>
    <div class='container'>
      <div class='columns is-centered'>
        <article class='card is-rounded'>
          <div class='card-content'>
            <h1 class='title'>Login</h1>
            <b-message v-if='errors' type="is-danger">
              <p v-for='(error, index) in errors' :key='index'>{{ error }}</p>
            </b-message>
            <b-field label='Email'>
              <b-input type='email'
                v-model='email'
                placeholder='Email'
                icon="envelope"
                rounded>
              </b-input>
            </b-field>
            <b-field label='Password'>
              <b-input type='password'
                  v-model='password'
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
                  @click='login'>
                  Login
                </button>
              </p>
            </div>
            <p class='level-left'>Don't have an account?
              <router-link to='/signup'>SignUp</router-link>
            </p>
            <router-link to='/password_reset' class='level-left'>Forgot password?</router-link>
          </div>
        </article>
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
      password: '',
      errors: '',
    };
  },
  methods: {
    ...mapActions({
      authLogin: 'AUTH_LOGIN',
    }),
    login() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      this.authLogin(loginData)
        .then(() => this.$router.push('/'))
        .catch((err) => { this.errors = err.errors; });
    },
  },
};
</script>
