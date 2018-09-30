<template>
  <div>
    <div class='container'>
      <div class='columns is-centered'>
        <article class='card is-rounded'>
          <div class='card-content'>
            <h1 class='title'>SignUp</h1>
            <b-field label='Username'
              :type="$v.username.$error ? 'is-danger' : ''"
              :message="$v.username.minLen? '': 'Username must have at least 3 characters'">
              <b-input
                v-model.trim.lazy='$v.username.$model'
                placeholder='Username'
                icon="user"
                rounded>
              </b-input>
            </b-field>
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
              <b-input type="password"
                v-model.trim.lazy='$v.password.$model'
                placeholder='Password'
                icon="lock"
                rounded
                password-reveal>
              </b-input>
            </b-field>
            <b-field label="Confirm Password"
              :type="$v.passwordConfirmation.$error ? 'is-warning' : ''"
              :message="$v.passwordConfirmation.minLen?
                '': 'Password must have at least 6 characters.'">
              <b-input type="password"
                v-model.trim.lazy='$v.passwordConfirmation.$model'
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
                  @click='signUp'
                  :disabled='$v.$invalid'>
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
import formValidations from '@/mixins/validations/Form';

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
  mixins: [formValidations],
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
