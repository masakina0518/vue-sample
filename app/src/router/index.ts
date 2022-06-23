import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeComponent from '@/views/Home.vue';
import ProfileComponent from '@/views/Profile.vue';
import ShareComponent from '@/views/Share.vue';
import SignInComponent from '@/views/SignIn.vue';
import { calendarRoutes } from '@/router/calendar/calendar';
import { profileStore } from '@/store/profile/profile';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent,
    meta: {
      title: 'home',
    },
  },
  ...calendarRoutes,
  {
    path: '/profile',
    name: 'profile',
    component: ProfileComponent,
  },
  {
    path: '/share',
    name: 'share',
    component: ShareComponent,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignInComponent,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.beforeEach((to: any, from: any, next: any) => {
  if (to.path === '/sign-in') {
    next();
    return;
  }
  if (profileStore.getProfile) {
    next();
    return;
  }

  next('/sign-in');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.afterEach((to: any) => {
  if (!to.meta.title) {
    return;
  }

  document.title = to.meta.title;
});

export default router;
