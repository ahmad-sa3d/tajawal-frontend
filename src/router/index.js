/**
 * Application Routes
 */

import Vue from 'vue'
import Router from 'vue-router'
let Home = () => import('@/components/Home')
let Hotels = () => import('@/components/Hotels/Hotels')
let Hotel = () => import('@/components/Hotels/Hotel')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/hotels',
      name: 'hotels',
      component: Hotels,
    },
    {
      path: '/hotels/:id',
      name: 'hotel',
      component: Hotel
    }
  ],
  mode: 'history'
})
