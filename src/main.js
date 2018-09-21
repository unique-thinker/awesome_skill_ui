// @ is an alias to /src
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import axios from 'axios';

Vue.config.productionTip = false;

const token = localStorage.getItem('user-token');

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

if (token) {
  axios.defaults.headers.common.Authorization = token;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
