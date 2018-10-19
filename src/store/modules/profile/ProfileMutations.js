import types from '@/store/modules/profile/ProfileMutationTypes';

export default {

  [types.REQUEST_LOAD_PROFILE](state) {
    Object.assign(state, {
      isLoading: true,
    });
  },

  [types.RECEIVE_LOAD_PROFILE](state, profileData) {
    Object.assign(state, {
      profile: profileData.profile,
      countriesData: profileData.countriesData,
      isLoading: false,
    });
  },

  [types.RECEIVE_LOAD_PROFILE_ERROR](state) {
    Object.assign(state, {
      isLoading: false,
    });
  },

  [types.REQUEST_SAVE_PROFILE](state) {
    Object.assign(state, {
      isSaving: true,
    });
  },

  [types.RECEIVE_SAVE_PROFILE](state, profileData) {
    Object.assign(state, {
      profile: profileData,
      isSaving: false,
    });
  },

  [types.RECEIVE_SAVE_PROFILE_ERROR](state) {
    Object.assign(state, {
      isSaving: false,
    });
  },
};
