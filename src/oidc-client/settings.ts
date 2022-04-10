import { createOidcAuth, SignInType } from 'vue-oidc-client/vue3';
import OidcEvents from './events';

const appUrl = import.meta.env.VITE_APP_PATH as string;


const mainOidc = createOidcAuth('main', SignInType.Window, appUrl , {
  authority: import.meta.env.VITE_APP_IDENTITY_SERVER_PATH as string,
  client_id: 'verbum-web-api',
  response_type: 'code',
  scope: 'openid profile VerbumWebAPI'
});

OidcEvents(mainOidc)

export default mainOidc
