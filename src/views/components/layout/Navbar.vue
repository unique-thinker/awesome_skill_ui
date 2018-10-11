<template>
<nav class='navbar is-dark'>
  <div class='navbar-brand'>
    <a class='navbar-item' href='/'>
      <img src='@/assets/logo.png' alt='Awesome skils' width='56' height='28'>
    </a>
    <div
      class='navbar-burger burger'
      @click='showNavBurger = !showNavBurger'
      :class="{ 'is-active': showNavBurger }"
      data-target='awesomeSkills'>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id='awesomeSkills' class='navbar-menu' :class="{ 'is-active': showNavBurger }">
    <div class='navbar-start'>
      <a class='navbar-item' href='/'>
        Home
      </a>
      <a class='navbar-item' href='#'>
        Band
      </a>
      <a class='navbar-item' href='#'>
        Tour
      </a>
      <a class='navbar-item' href='#'>
        Contact
      </a>
      <div class='navbar-item has-dropdown is-hoverable'>
        <a class='navbar-link' href='#'>
          More
        </a>
        <div class='navbar-dropdown is-boxed'>
          <a class='navbar-item' href='#'>
            Mechandise
          </a>
          <a class='navbar-item' href='#'>
            Extras
          </a>
          <a class='navbar-item' href='#'>
            Media
          </a>
        </div>
      </div>
    </div>

    <div class='navbar-end'>
      <div class='navbar-item'>
        <div class='field is-grouped'>
          <p v-if='!isAuthenticated' class='control'>
            <router-link to='/login'>Login</router-link>
          </p>
          <p v-if='!isAuthenticated' class='control'>
            <router-link to='/signup'>SignUp</router-link>
          </p>
          <p v-if='isAuthenticated' class='control' @click='logout'>
            <a>Logout</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      showNavBurger: false,
    };
  },
  methods: {
    ...mapActions(['authLogout']),
    logout() {
      this.authLogout()
        .then(() => {
          this.$router.push('/login');
        });
    },
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>
