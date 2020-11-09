import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueTypeScriptInject from 'vue-typescript-inject';
// import serviceContainer from '@/core/service-container';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// Vue.use(VueTypeScriptInject)

new Vue({
  // provide: serviceContainer,
  render: h => h(App)
}).$mount("#app");
