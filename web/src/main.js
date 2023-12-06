import mitt from 'mitt'
import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from '@/plugins'

import '@/assets/styles/app.scss'
import '@/assets/styles/emoji.scss'

window.Bus = mitt()

const app = createApp(App)
registerPlugins(app)

app.mount('#app')