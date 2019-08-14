// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueScroller from 'vue-scroller'
import { get, post } from './http/http'
Vue.use(VueScroller)
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

Vue.prototype.GET = get;
Vue.prototype.POST = post;
Vue.prototype.axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
