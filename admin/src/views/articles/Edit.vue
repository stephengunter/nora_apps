<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
   CREATE_ARTICLE, STORE_ARTICLE, 
   EDIT_ARTICLE, UPDATE_ARTICLE, OFF_ARTICLE, DELETE_ARTICLE
} from '@/store/actions.type'
import { setValues, onError, onSuccess } from '@/utils'

const name = 'ArticlesEditView'
const INDEX_NAME = 'articles'
const data = reactive({
	model: null
})
const store = useStore()
const route = useRoute()
const router = useRouter()
const pagedList = computed(() => store.state.articles.pagedList)

watch(route, init)

onMounted(init)

function init() {
	
	fetchData(route.params.id ? route.params.id : 0)
}

function fetchData(id) {
	console.log('fetchData', id)
	if(id) {
		store.dispatch(EDIT_ARTICLE, id)
		.then(model => {
			data.model = model
		})
		.catch(error => onError(error))
	}else {
		store.dispatch(CREATE_ARTICLE)
		.then(model => {
			data.model = model
		})
		.catch(error => onError(error))
	}
}

function save(form) {
	setValues(form, data.model)

	let action = data.model.id > 0 ? UPDATE_ARTICLE : STORE_ARTICLE
	store.dispatch(action, data.model)
	.then(() => {
		onSuccess()
	})
	.catch(error => onError(error))
}
function cancel() {
	console.log('cancel')
}
function back() {
	const from = store.state.app.route.from
	if(from && from.name === INDEX_NAME && from.query) {
		router.push({ name: INDEX_NAME, query: from.query })
	}
	else router.push({ name: INDEX_NAME })
}
</script>

<template>
	<ArticleEdit v-if="data.model" :model="data.model" 
	@save="save" @cancel="back"
	/>
</template>