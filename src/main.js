// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import {BootstrapVue,BootstrapVueIcons} from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueTouch from 'vue-touch';
import Trend from 'vuetrend';
import Toasted from 'vue-toasted';
import VueApexCharts from 'vue-apexcharts';
import axios from 'axios';
import store from './store';
import router from './Routes';
import App from './App';
import layoutMixin from './mixins/layout';
import { AuthMixin } from './mixins/auth'
import Widget from './components/Widget/Widget';
import Vuelidate from 'vuelidate'
import { ClientTable } from 'vue-tables-2';
import config from './config'

axios.defaults.baseURL = config.baseURLApi;

Vue.use(ClientTable, { theme: 'bootstrap4' });
Vue.use(Vuelidate)
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueTouch);
Vue.use(Trend);
Vue.component('Widget', Widget);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});
Vue.component('apexchart', VueApexCharts);
Vue.mixin(layoutMixin);
Vue.mixin(AuthMixin);
Vue.use(Toasted, {duration: 10000});

//store.dispatch('auth/doInit')
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
