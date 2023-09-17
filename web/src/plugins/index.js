import router from '@/routes'
import store from '@/store'

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import { Vue3Mq } from 'vue3-mq'
import timeago from 'vue-timeago3'
import { zhTW } from 'date-fns/locale'

export function registerPlugins (app) {
  loadFonts()
  app.use(vuetify)
		.use(Vue3Mq, {
			preset: 'vuetify'
		})
		.use(timeago, {
			converterOptions: {
				includeSeconds: false,
			},
			locale: zhTW
		})
		.use(router)
		.use(store)
}
