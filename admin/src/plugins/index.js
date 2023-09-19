import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import vue3GoogleLogin from 'vue3-google-login';
import { GOOGLE_AUTH_PARAMS } from '@/config';

export function registerPlugins (app) {
   loadFonts();
   app.use(vuetify);
   app.use(vue3GoogleLogin, {
      clientId: GOOGLE_AUTH_PARAMS.client_id
   });
}
