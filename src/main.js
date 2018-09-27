// @ is an alias to /src
import Vue from 'vue';
import App from '@/App.vue';
// Router
import router from '@/router';
// Vuex
import store from '@/store';
// Axios
import axios from '@/store/modules/plugins/Axios';
// Buefy
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.use(Buefy);

Vue.config.productionTip = false;

const accessToken = localStorage.getItem('access-token');
const tokenType = localStorage.getItem('token-type');
const client = localStorage.getItem('client');
const uid = localStorage.getItem('uid');
const expiry = localStorage.getItem('expiry');

if (accessToken && tokenType && client && uid && expiry) {
  axios.defaults.headers.common['access-token'] = accessToken;
  axios.defaults.headers.common['token-type'] = tokenType;
  axios.defaults.headers.common.client = client;
  axios.defaults.headers.common.uid = uid;
  axios.defaults.headers.common.expiry = expiry;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
