import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@/store/modules/auth';
import Session from '@/store/modules/session/SessionMutations';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
  },
  state: {

  },
  mutations: {
    ...Session,
  },
  actions: {

  },
});
