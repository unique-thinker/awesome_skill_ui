export default {
  profile: state => state.profile,
  isLoading: state => state.isLoading,
  isSaving: state => state.isSaving,
  countriesData: state => state.countriesData,
  statesFindByCountry: states => country => (country ? states.countriesData[country].states : null),
};
