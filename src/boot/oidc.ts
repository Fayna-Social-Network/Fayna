import { boot } from 'quasar/wrappers';
import Oidc from '../oidc-client/settings'

export default boot(({ app }) => {

  Oidc.startup().then(ok => {
    if(ok){
      app.config.globalProperties.$oidc = Oidc
    }else{
      console.log("OIDC connection error!!!")
    }
  })
});
