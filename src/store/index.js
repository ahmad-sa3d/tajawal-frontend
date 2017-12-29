/**
 * Application Store
 */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

import { appStatus } from './AppStatus'
import { hotelsStore } from './HotelsStore'

const store = new Vuex.Store({
	modules: {
		appStatus,
		hotelsStore
	},
})

export {store}