<template>
  <div>
    <div class="columns">
      <div class="column"></div>
      <div class="column">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" v-model='email'>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" v-model="password">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button is-success" @click='onSubmit'>
              Login
            </button>
          </p>
        </div>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      console.log('onSubmit');
      const formData = {
        session: {
          email: this.email,
          password: this.password,
        },
      };
      console.log(formData);
      axios.defaults.headers.common.Accept = 'application/json';
      axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
      axios.post('http://localhost:3000/auth/sign_in', formData)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    },
  },
};
</script>
