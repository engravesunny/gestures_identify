import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import './assets/icon/iconfont/iconfont.css'

import router from './router/index.js'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
