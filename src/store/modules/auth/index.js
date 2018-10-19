import state from '@/store/modules/auth/AuthState';
import actions from '@/store/modules/auth/AuthActions';
import mutations from '@/store/modules/auth/AuthMutations';
import getters from '@/store/modules/auth/AuthGetters';

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
