import axios from 'axios'

export const appStatus = {
	namespaced: true,
	state: {
		isLoading: false,
	},
	mutations: {
		setLoading (state, payload) {
			if (payload != state.isLoading) {
				state.isLoading = !! payload;
			}
		},
	},
	getters: {
		isLoading (state) {
			return state.isLoading;
		},
	}
}