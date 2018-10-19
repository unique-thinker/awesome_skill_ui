<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      maxDate: new Date(),
      profileInfo: {},
      hasError: false,
      errorMessages: null,
    };
  },

  created() {
    this.fatchProfle();
  },

  computed: {
    ...mapGetters(
      'profile',
      [
        'profile',
        'countriesData',
        'statesFindByCountry',
        'isLoading',
        'isSaving',
      ],
    ),
  },

  methods: {
    ...mapActions(
      'profile',
      [
        'loadProfile',
        'saveProfile',
      ],
    ),

    fatchProfle() {
      this.loadProfile()
        .then(() => {
          this.profileInfo = Object.assign({}, this.profile);
          this.profileInfo.birthday = new Date(this.profileInfo.birthday);
        })
        .catch(() => {
          this.$snackbar.open({
            message: 'Oops! Something went wrong, please try again later.',
            type: 'is-info',
            position: 'is-bottom',
            actionText: 'Retry',
            onAction: () => this.fatchProfle(),
          });
        });
    },

    submitProfile() {
      const profileData = {
        profile: {
          first_name: this.profileInfo.firstName,
          last_name: this.profileInfo.lastName,
          birthday: this.toUTC(this.profileInfo.birthday),
          gender: this.profileInfo.gender,
          status: this.profileInfo.status,
          bio: this.profileInfo.bio,
          professions: this.profileInfo.professions,
          company: this.profileInfo.company,
          current_place: this.profileInfo.currentPlace,
          native_place: this.profileInfo.nativePlace,
          state: this.profileInfo.state,
          country: this.profileInfo.country,
        },
      };
      this.saveProfile(profileData)
        .then(() => {
          this.$toast.open({
            type: 'is-success',
            message: 'Profile updated successfully',
            queue: false,
          });
        })
        .catch((err) => {
          this.hasError = true;
          this.errorMessages = err.response.data.errors.full_messages;
        });
    },

    toUTC(date) {
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    },
  },
};
</script>

<template>
  <section class='section'>
    <b-loading
      :is-full-page='true'
      :active.sync='isLoading'>
    </b-loading>
    <div class='columns'>
      <div class='column is-full-mobile is-three-quarters-tablet is-three-quarters-desktop is-four-fifths-widescreen is-two-thirds-fullhd'>
        <b-notification
          :active.sync='hasError'
          :auto-close='hasError'
          type='is-danger' :has-icon='hasError'>
          <p v-for='(error, index)in errorMessages' :key='index'>{{ error }}</p>
        </b-notification>
        <form class='box' @submit.prevent='submitProfile()'>
          <b-field label='First Name'>
            <b-field>
              <b-input
                placeholder='First Name'
                v-model.trim.lazy='profileInfo.firstName'>
              </b-input>
            </b-field>
          </b-field>

          <b-field label='Last Name'>
            <b-input
              placeholder='Last Name'
              v-model.trim.lazy='profileInfo.lastName'>
            </b-input>
          </b-field>

          <b-field label='Status'>
            <b-input
              placeholder='status'
              v-model.trim.lazy='profileInfo.status'>
            </b-input>
          </b-field>

          <b-field label='Bio'>
            <b-input
              type='textarea'
              v-model.trim.lazy='profileInfo.bio'>
            </b-input>
          </b-field>

          <b-field label='Gender'>
            <b-radio
              v-model='profileInfo.gender'
              native-value='M'>
              Male
            </b-radio>
            <b-radio
              v-model='profileInfo.gender'
              native-value='F'>
              Female
            </b-radio>
          </b-field>

          <b-field label='Date of Birth'>
            <b-datepicker
              placeholder='mm-dd-yyyy'
              v-model.trim.lazy='profileInfo.birthday'
              icon='calendar-alt'
              :max-date="maxDate">
            </b-datepicker>
          </b-field>

          <b-field label='Professions'>
            <b-input
              placeholder='professions'
              v-model.trim.lazy='profileInfo.professions'>
            </b-input>
          </b-field>

          <b-field label='Company'>
            <b-input
              placeholder='company'
              v-model.trim.lazy='profileInfo.company'>
            </b-input>
          </b-field>

          <b-field label='Current Place'>
            <b-input
              placeholder='current place'
              v-model.trim.lazy='profileInfo.currentPlace'
              icon='map-marker-alt'>
            </b-input>
          </b-field>

          <b-field label='Home Town' >
            <b-input
              placeholder='home town'
              v-model.trim.lazy='profileInfo.nativePlace'
              icon='home'>
            </b-input>
          </b-field>

          <b-field label='Country'>
            <b-select
              placeholder='Country'
              v-model='profileInfo.country'
              icon='globe'>
              <option :value='null'>Please select country</option>
              <option
                v-for='(country, index) in Object.keys(countriesData)'
                :key='index'>
                {{ country }}
              </option>
            </b-select>
          </b-field>

          <b-field label='State'>
            <b-select
              placeholder='State'
              v-model='profileInfo.state'
              :disabled='!profileInfo.country'>
              <option
                v-for='(state, index) in statesFindByCountry(profileInfo.country)'
                :key='index'>
                {{ state['name'] }}
              </option>
            </b-select>
          </b-field>
          <div class='field'>
            <p class='control'>
              <button
                class='button is-link is-medium'
                :class="{ 'is-loading': isSaving }"
                type='submit'>
                Update
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
