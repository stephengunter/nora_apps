import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routes'
import store from '@/store'
import mitt from 'mitt'
import { isTrue } from '@/utils'

window.Bus = mitt()
// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
app.use(router)
app.use(store)
 

registerPlugins(app)
app.mount('#app')
