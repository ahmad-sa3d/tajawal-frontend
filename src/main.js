// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/scss/app.scss'
import Vue from 'vue'

import Notifications from 'vue-notification'
import velocity      from 'velocity-animate'
Vue.use(Notifications, { velocity })

import axios from 'axios'
axios.defaults.baseURL = 'https://api.tajawal.dev/v1'
window.Vue = Vue

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VAvatar,
  VCard,
  VChip,
  VDataTable,
  VProgressCircular,
  VProgressLinear,
  VTextField,
  VSelect,
  VDivider,
  VDialog,
  VDatePicker,
  VBadge,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VAvatar,
    VCard,
    VChip,
    VDataTable,
    VProgressCircular,
    VProgressLinear,
    VTextField,
    VSelect,
    VDivider,
    VDialog,
    VDatePicker,
    VBadge,
    transitions
  },
  theme: {
    // primary: '#ee44aa',
    primary: '#2196F3',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

import App from './App'
import router from './router'
import { store } from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
