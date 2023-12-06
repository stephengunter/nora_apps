<script setup>
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, helpers } from '@vuelidate/validators'
import { setValues, statusText } from '@/utils'
import { FIELD_REQUIRED } from '@/consts'

const name = 'ArticleEdit'
const props = defineProps({
   model: {
		type: Object,
		default: null
	}
})

const tiptap = ref(null)

const labels = {
	'title':'標題',
	'content':'內容'
}
const emit = defineEmits(['save', 'cancel'])

const form = reactive({
	title: '',
	content: '',
	active: false
})
const data = reactive({
	errors: {
		'content': false
	}
})
const rules = {
	title: { required: helpers.withMessage(`${FIELD_REQUIRED}${labels['title']}`, required) }
}
const v$ = useVuelidate(rules, form)

const status_text = computed(() => statusText(form.active))


onBeforeMount(init)
function init() {
	setValues(props.model, form)
   console.log('init', form)
}

function cancel() {
	emit('cancel')
}
function onContentChanged() {
	data.errors.content = false
}
function onSubmit() {
	v$.value.$validate().then(valid => {
		if(!valid) return
		if(tiptap.value.isEmpty()) {
			data.errors.content = true
			return
		}
		data.errors.content = false
		form.content = tiptap.value.getContent()
		emit('save', form)
	})
}
function onRemove() {
	console.log('remove')
}
</script>

<template>
	<v-card >
		<v-toolbar>
			<v-toolbar-title class="text-h6">
				{{ props.model.id ? '編輯文章' : '新增文章' }}
				<span v-if="props.model.id" class="headline ml-3">Id : {{ props.model.id }}</span>
			</v-toolbar-title>

			<template v-slot:append>
				<v-btn  @click.prevent="cancel" icon="mdi-window-close" />
			</template>
		</v-toolbar>
		<v-card-text >
			<form @submit.prevent="onSubmit">
				<v-row>
					<v-col cols="12">
						<v-switch
						v-model="form.active"
						color="success" :label="status_text"
						/>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<v-text-field
						v-model="form.title"
						:error-messages="v$.title.$errors.map(e => e.$message)"
						:label="labels['title']"
						@input="v$.title.$touch"
		 				@blur="v$.title.$touch"
						/>
					</v-col>
					<v-col cols="12">
						<p style="line-height: 2em;">
							<span v-text="labels['content']"></span>
							<span v-if="data.errors.content" class="text-red ml-2">{{  `*${FIELD_REQUIRED}${labels['content']}`  }}</span>
						</p>
						<EditorTiptap ref="tiptap"  min_height="320px"
						:content="form.content"
						@changed="onContentChanged"
						/>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="6">
						<v-btn type="submit" color="success">
						存檔
						</v-btn>
					</v-col>
					<v-col cols="6" class="text-right">
						<v-btn @click.prevent="onRemove" color="error">
						刪除
						</v-btn>
					</v-col>
				</v-row>
			</form>
		</v-card-text>
	</v-card>
   
</template>