import { route } from 'quasar/wrappers';
import { useMainStore } from 'src/stores/Main';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import mainOidc from 'src/oidc-client/settings';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createWebHistory(import.meta.env.BASE_URL),
});


export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);



  Router.beforeResolve(to => {
    const mainStore = useMainStore()
    if (to.meta.dataIsLoad) {
      if(!mainStore.isReady){
        Router.push('/')
      }
    }
  })

  mainOidc.useRouter(Router)

  return Router;
});

