import  mainOidc from 'src/oidc-client/settings';
import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}


const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_APP_BACKEND_PATH
});


api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`

  return config
})



api.interceptors.response.use((config) => {

  return config
},

  async (error) => {

      const originalRequest = error.config
       if (error.response.status == 401 && error.config && !error.config._isRetry){
           originalRequest._isRetry = true
           try {

               localStorage.setItem('token', mainOidc.accessToken)
               return api.request(originalRequest)
           } catch (error) {
               console.log('Пользователь не авторизован')
           }

       }

          throw error
   }
)



export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
