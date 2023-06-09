import { createApp } from 'vue'
import pinia from './store/pinia'
import App from './App.vue'
import './style.css'
import './assets/icon/iconfont/iconfont.css'

import router from './router/index.js'

const app = createApp(App)
app.use(pinia).use(router)

app.mount('#app')
