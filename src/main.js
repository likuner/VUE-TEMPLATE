import App from './App.vue'
import router from './router'
import store from './store'
import './style'
// import '@likun./lazy-img'
// import './mock'

console.log('process.env', process.env)

// Vue has been loaded by ProvidePlugin of webpack
Vue.createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
