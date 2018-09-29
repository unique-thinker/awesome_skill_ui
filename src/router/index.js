import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/components/auth/Login.vue';
import SignUp from '@/views/components/auth/SignUp.vue';
import PasswordReset from '@/views/components/auth/PasswordReset.vue';
import NewPassword from '@/views/components/auth/NewPassword.vue';
import store from '@/store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const ifAuthenticatedUrl = (to, from, next) => {
  const params = to.query;
  if (params['access-token'] && params.token && params.client) {
    next();
    return;
  }
  next('/login');
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/signup',
      name: 'signUp',
      component: SignUp,
    },
    {
      path: '/password_reset',
      name: 'passwordReset',
      component: PasswordReset,
    },
    {
      path: '/new_password',
      name: 'newPassword',
      component: NewPassword,
      beforeEnter: ifAuthenticatedUrl,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
  ],
});
