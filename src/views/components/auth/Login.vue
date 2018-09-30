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
                  @click='login'
                  :disabled="$v.email.$invalid || $v.password.$invalid">
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
