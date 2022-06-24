import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// eslint-disable-next-line vue/multi-word-component-names
new Vue({
  render: h => h(App)
}).$mount('#app')
