import state from '@/store/modules/profile/ProfileState';
import actions from '@/store/modules/profile/ProfileActions';
import getters from '@/store/modules/profile/ProfileGetters';
import mutations from '@/store/modules/profile/ProfileMutations';

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
