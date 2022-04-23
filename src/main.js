import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style'
// import '@likun./lazy-img'
// import './mock'

require('./registerServiceWorker')

console.log('process.env', process.env)

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
