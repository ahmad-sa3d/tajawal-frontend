import axios from 'axios'

export const hotelsStore = {
	namespaced: true,
	state: {
		hotels: null
	},
	mutations: {
		setHotels (state, payload) {
			state.hotels = payload;
		}
	},
	actions: {
		getHotels ({commit, state}, payload) {
	    	return new Promise((resolve, reject) => {
				if (null === state.hotels || payload.forceLoad) {
					commit('setHotels', [])
					// Send Request
					axios.get('/hotels', {
						params: payload.params
					})
					.then(res => {
						try {
							commit('setHotels', res.data.data.hotels.data)
							resolve(state.hotels)
						} catch(err) {
							console.log(err);
							reject(err)
						}
					})
					.catch(err => {
						console.log(err)
						reject(err)
					})
				} else {
					resolve(state.hotels)
				}
			})
		}
	},
	getters: {
		hotels (state) {
			return (null === state.hotels) ? [] : state.hotels;
		}
	}
}