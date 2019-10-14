import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "@/plugins/echarts";

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  render: function (h) { return h(App) },
  router,
}).$mount('#app')

