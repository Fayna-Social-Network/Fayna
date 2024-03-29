import { RouteRecordRaw } from 'vue-router';
import mainOidc from 'src/oidc-client/settings';
import { defineAsyncComponent } from 'vue';
import Loader from "components/UI/Loader.vue"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import("src/layouts/EmptyLayout.vue"),
    children: [{ path: '/', component: () => import('pages/Welcome.vue') }],
  },


  {
    path: '/fayna',
    meta: {dataIsLoad: true},
    component: defineAsyncComponent({
      loader: () => import("src/layouts/MainLayout.vue"),
      loadingComponent: Loader
    }),
    children: [
      {
        path: 'start',
        name: 'Start',
        component: () => import('pages/StartPage.vue')
      },

      {
        path: 'correspondence',
        name: 'Correspondence',
        component: defineAsyncComponent({
          loader: () => import("src/pages/correspondence.vue"),
          loadingComponent: Loader
        })
      },

      {
        path: 'profile',
        name: 'userProfile',
        props: true,
        component: () => import('pages/userProfile.vue')
      },

      {
        path: 'message_notify',
        name: 'messageNotify',
        component: () => import('pages/notifyView/messageNotify.vue')
      },
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
