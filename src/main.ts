import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, ToastPlugin, IconsPlugin } from 'bootstrap-vue';
const VueInputAutowidth = require('vue-input-autowidth');
import '@/startup';
import '@/core/directives/digitsonly';
import '@/core/directives/quotes';
import '@/core/directives/nospaces';

// Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(ToastPlugin);
Vue.use(IconsPlugin);
Vue.use(VueInputAutowidth);

new Vue({
  render: h => h(App)
}).$mount('#app');
