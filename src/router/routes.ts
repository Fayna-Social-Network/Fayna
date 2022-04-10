import { RouteRecordRaw } from 'vue-router';
import mainOidc from 'src/oidc-client/settings';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [{ path: '', component: () => import('pages/Welcome.vue') }],
  },


  {
    path: '/fayna',
    meta: {dataIsLoad: true},
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/start',
        name: 'Start',
        component: () => import('pages/StartPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

  {
    path: '/:pathMatch(.*)',
    redirect: '/'
  },

  {
    path: '/secret',
    name: 'secret-route',
    meta: {
      authName: mainOidc.authName
    },
    component: []
  },
];

export default routes;
