import { boot } from 'quasar/wrappers';
import { VueSignalR } from '@quangdao/vue-signalr';

export default boot(({ app }) => {

  app.use(VueSignalR, {
    url: import.meta.env.VITE_SERVER_HUB_URL,
    automaticReconnect: true
  })
  
});
