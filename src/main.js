import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css' //Material Icons
// i18n
import i18n from './i18n/i18n'

// highcharts
import Highchart from 'highcharts/highcharts'
import stockInit from 'highcharts/modules/stock'
import HighchartsVue from 'highcharts-vue'
import highchatsMore from 'highcharts/highcharts-more'
stockInit(Highchart)
highchatsMore(Highchart)
Vue.use(HighchartsVue)


// VeeValidate
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import en from 'vee-validate/dist/locale/en'
Vue.use(VeeValidate, {
  dictionary:{
    zh:zh_CN,
    en:en
  } 
})
Validator.localize(localStorage.getItem('locale'))
import   './validate.js'

import DataViewSidebar  from './components/DataViewSidebar'
Vue.component(DataViewSidebar.name, DataViewSidebar)

import FeatherIcon  from './components/FeatherIcon.vue'
Vue.component(FeatherIcon.name, FeatherIcon)

import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

// 封装toast组件
import toastRegistry from './toast'
Vue.use(toastRegistry)

// 封装loading组件
import './components/Loading/index.css'
import Loading from './components/Loading/index';
Vue.use(Loading);

import message from './components/Message/index'
Vue.use(message)

// 封装api访问等功能
import tools from './tools/index.js';
Vue.prototype.$tools = tools;

Vue.use(vuesax)

// import test from './components/test'
// Vue.use(test)

// Styles: SCSS
import './assets/scss/main.scss'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = i18n.t(to.meta.title)
  next()
})

//定义全局过滤器
import * as filters from './filter.js'; // global filters
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
