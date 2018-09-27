<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/views/components/layout/Navbar.vue';


export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
@charset "utf-8";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
