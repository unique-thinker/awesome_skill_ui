// @ is an alias to /src
import Vue from 'vue';
import App from '@/App.vue';
// Router
import router from '@/router';
// Vuex
import store from '@/store';
// Buefy
import Buefy from 'buefy';
import 'buefy/dist/buefy.min.css';

Vue.use(Buefy, { defaultIconPack: 'fas' });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
