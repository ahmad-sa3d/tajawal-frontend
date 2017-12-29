<template>
	<v-card>
		<v-container fluid class="light-blue lighten-3">
			<v-layout column justify-center align-center>
				<v-flex class="pt-4 pb-4">
					<h4 class="display-2 white--text">{{ hotel.name }}</h4>
					<h3 class="white--text">{{ hotel.city }}</h3>
				</v-flex>
			</v-layout>
		</v-container>

		<v-data-table
		v-bind:headers="headers"
		:items="hotel.availability"
		hide-actions
		>
			<template slot="items" slot-scope="props">
				<td class="text-xs-center">{{ props.item.from }}</td>
				<td class="text-xs-center">{{ props.item.to }}</td>
			</template>

			<template slot="footer">
				<td colspan="100%">
					<v-card-title primary-title>
						<v-chip color="indigo" outline label>
							<v-avatar>
								<v-icon>attach_money</v-icon>
							</v-avatar>
							{{ hotel.price }}
						</v-chip>
					</v-card-title>
				</td>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
	export default {
		props: [
			'hotel'
		],
		data () {
			return {
				headers: [
					{text: 'From', value: 'from', align: 'center'},
					{text: 'To', value: 'to', align: 'center'}
				],
			}
		}
	}
</script>