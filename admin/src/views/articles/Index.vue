<script setup>
import { MqResponsive } from 'vue3-mq'
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { FETCH_ARTICLES } from '@/store/actions.type'
import { tryParseInt, onErrors, activeOptions } from '@/utils'

const name = 'ArticlesIndexView'
const store = useStore()
const route = useRoute()
const router = useRouter()

const initialState = {
   params: {
		category: 0,
		active: 1,
		page: 1,
		pageSize: 10
	}
}
const state = reactive({
   ...initialState,
})


// const pagedList = computed(() => store.state.articles.pagedList)

// watch(route, init)

onBeforeMount(() => {
	for(const [key, value] of Object.entries(state.params)) {
		console.log(key, typeof value)
	}
})

function init() {
	if(route.query) {
		const query = route.query
		if(query.hasOwnProperty('category')) params.category = tryParseInt(query['category'])
		if(query.hasOwnProperty('active')) params.active = tryParseInt(query['active'])
		if(query.hasOwnProperty('page')) params.page = tryParseInt(query['page'])
		if(query.hasOwnProperty('pageSize')) params.pageSize = tryParseInt(query['pageSize'])
	}
	fetchData()
}

// function fetchData() {
// 	store.dispatch(FETCH_ARTICLES, params)
// 	.catch(error => onError(error))
// }
// function onParamsChanged() {
// 	router.push({ path: route.path, query: params })
// }
// function create() {
// 	router.push({ path: '/articles/edit' })
// }
// function onPageChanged(page) {
// 	params.page = page
// 	onParamsChanged()
// }
// function onPageSizeChanged(size) {
// 	params.pageSize = size
// 	onParamsChanged()
// }

// function test() {
// 	console.log('test')
// }
</script>

<template>
	<div>
		<!-- <ArticleHeader :params="params" 
		@changed="onParamsChanged" @create="create"
		/>
		<core-table-pager v-if="pagedList"
		:model="pagedList"
		@page_changed="onPageChanged" @size_changed="onPageSizeChanged"
		/> -->
	</div>
	
   
</template>