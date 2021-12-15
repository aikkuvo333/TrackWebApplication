import Vue from 'vue'
import App from './App.vue'
import router from './router'

import BootstrapVue from 'bootstrap-vue';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
import '@/assets/css/main.css'

Vue.use(BootstrapVue);
Vue.use(Donut);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')