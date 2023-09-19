<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useField, useForm } from 'vee-validate'
const name = 'ArticleEdit'
const props = defineProps({
   model: {
		type: Object,
		default: null
	}
})
const data = reactive({
   model: {}
})

onBeforeMount(() => {
   if(props.model) {
		data.model = {
			id: props.model.id,
			title: props.model.title,

		}
	}else {
		data.model = null
	}
})

// const { handleSubmit } = useForm({
// 	validationSchema: yup.object({
// 		title: yup.string().required()
// 	})
// })


const title = computed(() => {
	let text = '文章'
	if(props.model.id) return `編輯${text}`
	return `新增${text}`
})


function cancel() {

}
// const onSubmit = handleSubmit(values => {
//    alert(JSON.stringify(values, null, 2));
// })
// function submit() {

// }
</script>

<template>
	<v-card>
		<v-toolbar>
			<v-toolbar-title class="text-h6">
				{{ title }}
				<span v-if="model.id" class="headline ml-3">Id : {{ model.id }}</span>
			</v-toolbar-title>

			<template v-slot:append>
				<v-btn  @click.prevent="cancel" icon="mdi-window-close" />
			</template>
		</v-toolbar>
		<v-card-text>
			<!-- <form @submit.prevent="onSubmit">
				<v-row>
					<v-col cols="12">
						<v-text-field
							v-model="name.value.value"
							:counter="10"
							:error-messages="name.errorMessage.value"
							label="Name"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<v-btn type="submit">submit</v-btn>
					</v-col>
				</v-row>
			</form> -->
		</v-card-text>
	</v-card>
   
</template>