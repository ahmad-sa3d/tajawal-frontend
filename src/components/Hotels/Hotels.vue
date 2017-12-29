<template>
	<v-container fluid>
		<v-layout row wrap>
			<v-flex xs12 sm10 offset-sm1 lg8 offset-lg2>
				<h4 class="text-xs-center display-2 pt-4 pb-4 accent--text">
					
					<v-badge right v-model="hasHotels">
				      <span slot="badge">{{ hotels.length }}</span>
				      <span>Hotels</span>
				    </v-badge>
				</h4>
				
				<!-- Form -->
				<v-card>
					<v-progress-linear
					 	:indeterminate="true"
					 	style="height: 2px; margin: 0"
						v-if="loadingHotels && !hotels.length"
				 	></v-progress-linear>
					<v-card-text>
						<form @submit.prevent.stop="search">
							<v-layout row wrap class="pr-2 pl-2">
								<v-flex sm5>
									<v-text-field
										name="name"
										v-model="params.name"
										label="Name"
										append-icon="label"
									></v-text-field>
								</v-flex>
								<v-flex xs12 sm2 class=""></v-flex>
								<v-flex sm5>
									<v-text-field
										name="city"
										label="City"
										v-model="params.city"
										append-icon="location_searching"
									></v-text-field>
								</v-flex>
							</v-layout>

							<v-layout row wrap class="pr-2 pl-2">
								<v-flex sm5>
									<v-text-field
										name="price"
										label="Price 10:100"
										v-model="params.price"
										append-icon="attach_money"
									></v-text-field>
								</v-flex>
								<v-flex xs12 sm2 class=""></v-flex>

								<v-flex sm5>
									<v-layout row wrap>
										<v-flex xs6>
											<v-dialog
												persistent
												v-model="fromDateModal"
												lazy
												full-width
												width="290px"
											>
												<v-text-field
													slot="activator"
													label="Date From"
													v-model="fromDateFormat"
													append-icon="event"
													readonly
												></v-text-field>
												<v-date-picker v-model="fromDate" scrollable actions>
													<template slot-scope="{ save, cancel }">
														<v-card-actions>
															<v-spacer></v-spacer>
															<v-btn flat color="primary" @click="cancel">Cancel</v-btn>
															<v-btn flat color="primary" @click="save">OK</v-btn>
														</v-card-actions>
													</template>
												</v-date-picker>
											</v-dialog>
										</v-flex>
										<v-flex xs6>
											<v-dialog
												persistent
												v-model="toDateModal"
												lazy
												full-width
												width="290px"
											>
												<v-text-field
													slot="activator"
													label="Date To"
													v-model="toDateFormat"
													append-icon="event"
													readonly
												></v-text-field>
												<v-date-picker v-model="toDate" scrollable actions>
													<template slot-scope="{ save, cancel }">
														<v-card-actions>
															<v-spacer></v-spacer>
															<v-btn flat color="primary" @click="cancel">Cancel</v-btn>
															<v-btn flat color="primary" @click="save">OK</v-btn>
														</v-card-actions>
													</template>
												</v-date-picker>
											</v-dialog>
										</v-flex>
									</v-layout>
								</v-flex>
							</v-layout>

							<v-layout row wrap class="pr-2 pl-2">
								<v-flex sm5>
									<v-select
										name="orderBy"
										label="Order By"
										v-model="params.order_by"
										append-icon="sort"
										:items="orderBy"
									></v-select>
								</v-flex>
								<v-flex xs12 sm2 class=""></v-flex>

								<v-flex sm5>
									<v-select
										name="orderDirection"
										label="Order Direction"
										v-model="params.order_direction"
										append-icon="sort"
										:items="orderDirection"
									></v-select>
								</v-flex>
							</v-layout>

							<v-layout>
								<v-spacer></v-spacer>
								<v-btn color="red" dark @click="reset" :disabled="!hasFilters">
									<v-icon left>clear</v-icon>
									Clear
								</v-btn>
								<v-btn color="info" type="submit">
									<v-icon left>search</v-icon>
									Filter
								</v-btn>
							</v-layout>
						</form>
					</v-card-text>
				</v-card>
		
				<v-layout>
					<v-flex xs12>
						<transition
							type="animatiom"
							mode="out-in"
							name="zoomIn"
				        >
							<v-card v-if="!loadingHotels && !hotels.length" class="mt-4">
								<v-container fluid class="light-blue lighten-3">
									<v-layout column justify-center align-center>
										<v-flex class="pt-4 pb-4">
											<h4 class="display-2 white--text">No Hotels Found</h4>
										</v-flex>
									</v-layout>
								</v-container>
							</v-card>
						</transition>
						
				        <transition-group
							type="animatiom"
							mode="out-in"
							name="zoomIn"
				        >
							<hotel-card
								v-for="hotel in hotels"
								:key="hotel.name"
								:hotel="hotel"
								class="mt-4"
							></hotel-card>
						</transition-group>
				        
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	import HotelCard from './partials/HotelCard.vue'
	import myUtils from 'saad-utils'
	export default {
		components: {
			HotelCard
		},
		data () {
			return {
				loadingHotels: false,
				params: {
					name: '',
					city: '',
					price: '',
					date: '',
					order_by: 'name',
					order_direction: 'asc',
				},
				orderBy: [
					'name',
					'price'
				],
				orderDirection: [
					'asc',
					'desc'
				],
				fromDateModal: false,
				fromDate: '',
				toDateModal: false,
				toDate: '',
			}
		},

		computed: {
			fromDateFormat () {
				let date = '', dateObj
				if (this.fromDate.length > 0) {
					dateObj = new Date(this.fromDate)
					date = ('0' + dateObj.getDate()).slice(-2) + '-' + ('0' + (dateObj.getMonth()+1)).slice(-2) + '-' + dateObj.getFullYear()
				}
				return date
			},

			toDateFormat () {
				let date = '', dateObj
				if (this.toDate.length > 0) {
					dateObj = new Date(this.toDate)
					date = ('0' + dateObj.getDate()).slice(-2) + '-' + ('0' + (dateObj.getMonth()+1)).slice(-2) + '-' + dateObj.getFullYear()
				}
				return date
			},

			hotels () {
				return this.$store.getters['hotelsStore/hotels']
			},

			hasFilters () {
				let hasFilters = false;
				for ( let p in this.params ) {
					if (this.params[p].length) {
						hasFilters = true;
						break;
					}
				}

				return hasFilters;
			},

			hasHotels () {
				return this.hotels.length > 0
			}
		},
		watch: {
			'fromDate': function(newVal, oldVal) {
				if (newVal != '') {
					if (!(/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(newVal)))
						this.fromDate = ''
				}
			},

			'toDate': function(newVal, oldVal) {
				if (newVal != '') {
					if (!(/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(newVal)))
						this.toDate = ''
				}
			},

			'fromDateFormat': function(newVal, oldVal) {
				this.params.date = newVal.length > 0 ? newVal : ''

				if (this.toDateFormat.length > 0) {
					this.params.date += this.params.date.length > 0 ? ':' + this.toDateFormat : this.toDateFormat
				}
			},

			'toDateFormat': function(newVal, oldVal) {
				if (this.fromDateFormat.length > 0) {
					this.params.date = this.fromDateFormat
				}

				if (newVal.length > 0) {
					this.params.date += this.params.date.length > 0 ? ':' + newVal : newVal
				}
			}
		},
		created () {
			// Dispatch Get Hotels
			this.params.name = myUtils.getUrlParameter( 'name', '' );
			this.params.city = myUtils.getUrlParameter( 'city', '' );
			this.params.price = myUtils.getUrlParameter( 'price', '' );
			this.params.order_by = myUtils.getUrlParameter( 'order_by', '' );
			this.params.order_direction = myUtils.getUrlParameter( 'order_direction', '' );

			this.getHotels(true);
		},
		methods: {
			getHotels (forceLoad) {
				this.loadingHotels = true;
				this.$store.dispatch('hotelsStore/getHotels', {
					forceLoad: forceLoad,
					params: this.params
				})
				.then(res => {
					this.loadingHotels = false;
					myUtils.updateBrowserQueryString(this.params)
				}).catch(err => {
					this.loadingHotels = false;
				})
			},

			search () {
				this.getHotels(true);
			},

			reset () {
				if (! this.hasFilters) {
					return;
				}

				for ( let p in this.params ) {
					this.params[p] = '';
				}

				this.fromDate = this.toDate = ''

				this.getHotels(true);
			}
		}
	}
</script>