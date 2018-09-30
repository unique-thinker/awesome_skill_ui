<template>
  <div>
    <div class='container'>
      <div class='columns is-centered'>
        <article class='card is-rounded'>
          <div class='card-content'>
            <h1 class='title'>SignUp</h1>
            <b-field label='Username'
              :type="errors.username ? 'is-danger' : ''"
              :message='errors.username'>
              <b-input
                v-model='username'
                placeholder='Username'
                icon="user"
                rounded>
              </b-input>
            </b-field>
            <b-field label='Email'
              :type="errors.email ? 'is-danger' : ''"
              :message='errors.email'>
              <b-input type='email'
                v-model='email'
                placeholder='Email'
                icon="envelope"
                rounded>
              </b-input>
            </b-field>
            <b-field label='Password'
              :type="errors.password ? 'is-danger' : ''"
              :message='errors.password'>
              <b-input type="password"
                v-model='password'
                placeholder='Password'
                icon="lock"
                rounded
                password-reveal>
              </b-input>
            </b-field>
            <b-field label="Confirm Password"
              :type="errors.encrypted_password ? 'is-danger' : ''"
              :message='errors.encrypted_password'>
              <b-input type="password"
                v-model='passwordConfirmation'
                placeholder='Confirm Password'
                icon="lock"
                rounded
                password-reveal>
              </b-input>
            </b-field>
            <div class='field'>
              <p class='control'>
                <button
                  class='button is-primary is-medium is-fullwidth is-rounded'
                  @click='signUp'>
                  SignUp
                </button>
              </p>
            </div>
            <p class='level-left'>Have an account?
              <router-link to='/login'>Login</router-link>
            </p>
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
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      success: '',
      errors: '',
    };
  },
  methods: {
    ...mapActions({
      authSignUp: 'AUTH_SIGNUP',
    }),
    signUp() {
      const signUpData = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      this.authSignUp(signUpData)
        .then(() => {
          this.$router.push('/');
          this.success = 'You have successfully registered';
          this.successBar();
        })
        .catch((err) => { this.errors = err.errors; });
    },
    successBar() {
      this.$snackbar.open({
        message: this.success,
        type: 'is-success',
        position: 'is-top',
        duration: 10000,
      });
    },
  },
};
</script>
