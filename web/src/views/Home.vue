<template>
	<v-container>
		<article-item class="mt-3" v-for="(item, index) in articles" :key="index"
			:model="item"
		/>
	</v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { FETCH_ARTICLES } from '@/store/actions.type';
import { onError, resolveErrorData } from '@/utils';

export default {
	name: 'HomeView',
	data(){
		return {
			
		}
	},
	beforeMount() {
		this.init();
	},
	computed: {
		...mapState({
			pagedList: state => state.articles.pagedList
		}),
		articles() {
			return this.pagedList ? this.pagedList.viewList : [];
		},
	},
  	methods: {
		init() {
			this.fetchData();
		},
		fetchData() {
			this.$store.dispatch(FETCH_ARTICLES)
			.catch(error => {
				Bus.$emit('errors', resolveErrorData(error));
			})
		}
	}
}
</script>
