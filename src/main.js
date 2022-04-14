import App from './App.vue'
import router from './router'
import store from './store'
import './style'
// import '@likun./lazy-img'
// import './mock'

require('./registerServiceWorker')

console.log('process.env', process.env)

// Vue will be loaded by ProvidePlugin of webpack
Vue.createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
