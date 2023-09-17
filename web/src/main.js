import mitt from 'mitt'
import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from '@/plugins'

window.Bus = mitt()

const app = createApp(App)
registerPlugins(app)

app.mount('#app')