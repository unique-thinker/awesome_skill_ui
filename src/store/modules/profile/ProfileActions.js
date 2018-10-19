import axios from '@/lib/utils/Axios';
import types from '@/store/modules/profile/ProfileMutationTypes';

const editProfilePath = '/profile/edit';
const updateProfilePath = '/profile';

export const transformBackendProfile = profile => ({
  firstName: profile.first_name,
  lastName: profile.last_name,
  birthday: profile.birthday,
  gender: profile.gender,
  status: profile.status,
  bio: profile.bio,
  professions: profile.professions,
  company: profile.company,
  currentPlace: profile.current_place,
  nativePlace: profile.native_place,
  state: profile.state,
  country: profile.country,
});

export default {
  requestLoadProfile({ commit }) {
    commit(types.REQUEST_LOAD_PROFILE);
  },

  receiveLoadProfile({ commit }, profileData) {
    commit(types.RECEIVE_LOAD_PROFILE, profileData);
  },

  receiveLoadProfileError({ commit }) {
    commit(types.RECEIVE_LOAD_PROFILE_ERROR);
  },

  loadProfile({ dispatch }) {
    dispatch('requestLoadProfile');
    return axios({ url: editProfilePath, method: 'GET' })
      .then((resp) => {
        const profileData = {
          profile: transformBackendProfile(resp.data.data.attributes),
          countriesData: resp.data.data.meta.country_data,
        };
        dispatch('receiveLoadProfile', profileData);
      })
      .catch((err) => {
        dispatch('receiveLoadProfileError');
        throw err;
      });
  },

  requestSaveProfile({ commit }) {
    commit(types.REQUEST_SAVE_PROFILE);
  },

  receiveSaveProfile({ commit }, profileData) {
    commit(types.RECEIVE_SAVE_PROFILE, profileData);
  },

  receiveSaveProfileError({ commit }) {
    commit(types.RECEIVE_SAVE_PROFILE_ERROR);
  },

  saveProfile({ dispatch }, profileData) {
    dispatch('requestSaveProfile');
    return axios({ url: updateProfilePath, data: profileData, method: 'PATCH' })
      .then(() => {
        dispatch('receiveSaveProfile', transformBackendProfile(profileData.profile));
      })
      .catch((err) => {
        dispatch('receiveSaveProfileError');
        throw err;
      });
  },
};
