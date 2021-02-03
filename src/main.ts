import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, ToastPlugin, IconsPlugin } from 'bootstrap-vue';
import '@/startup';
import '@/core/directives/digitsonly';
import '@/core/directives/quotes';

// Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(ToastPlugin);
Vue.use(IconsPlugin);

new Vue({
  render: h => h(App)
}).$mount("#app");
