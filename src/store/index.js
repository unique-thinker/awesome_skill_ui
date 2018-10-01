import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@/store/modules/Auth';
import AuthTokenMutation from '@/store/mutations/AuthToken';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
  },
  state: {

  },
  mutations: {
    ...AuthTokenMutation,
  },
  actions: {

  },
});
