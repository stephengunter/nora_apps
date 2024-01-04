<script setup>
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, helpers } from '@vuelidate/validators'
import { VALIDATE_MESSAGES } from '@/consts'
import { SET_ERRORS, CLEAR_ERRORS } from '@/store/mutations.type'
import { WIDTH, HEIGHT, ACTION_TITLES } from '@/consts'
import { setValues, statusText } from '@/utils'

const name = 'ArticleEdit'
const props = defineProps({
   model: {
		type: Object,
		default: null
	},
	title: {
		type: String,
		default: ''
	}
})
const emit = defineEmits(['submit', 'cancel'])
const store = useStore()

const initialState = {
   form: {
		id: 0,
      active: false,
      title: '',
		content: '',
		summary: ''
   },
	errors: {
		'content': false
	}
}
const state = reactive({
   ...initialState
})

const tiptap = ref(null)

const labels = {
	'active':'狀態',
	'title':'標題',
	'content':'內容',
	'summary':'摘要'
}

const rules = computed(() => {
	return {
		title: { 
			required: helpers.withMessage(VALIDATE_MESSAGES.REQUIRED(labels['title']), required)
		}
	}
})

const v$ = useVuelidate(rules, state.form)

const status_text = computed(() => statusText(state.form.active))


onBeforeMount(init)

function init() {
	setValues(props.model, state.form)
}

function cancel() {
	emit('cancel')
}
function onContentChanged() {
	state.errors.content = false
}
function onSubmit() {
	v$.value.$validate().then(valid => {
		if(!valid) return
		if(tiptap.value.isEmpty()) {
			state.errors.content = true
			return
		}
		state.errors.content = false
		state.form.content = tiptap.value.getContent()
		emit('submit', state.form)
	})
}
function onRemove() {
	console.log('remove')
}
function onInputChanged(){
   store.commit(CLEAR_ERRORS)
}
</script>

<template>
	<v-card :max-width="WIDTH.M">
		<v-toolbar>
			<v-card-title>
				<span class="text-h5 font-weight-black">{{ props.title }}</span>
				<span v-if="props.model.id" class="headline ml-3">Id : {{ props.model.id }} </span>           
			</v-card-title>
			<template v-slot:append>
				<v-tooltip :text="ACTION_TITLES.CANCEL">
					<template v-slot:activator="{ props }">
						<v-btn v-bind="props" icon="mdi-window-close" 
						@click.prevent="cancel" 
						/>
					</template>
				</v-tooltip>
			</template>
		</v-toolbar>
		<v-card-text>
			<v-container>
				<form @submit.prevent="onSubmit" @input="onInputChanged">
					<v-row>
						<v-col cols="12">
							<v-text-field :label="labels['title']"                
							v-model="state.form.title"
							:error-messages="v$.title.$errors.map(e => e.$message)"                     
							@input="v$.title.$touch"
							@blur="v$.title.$touch"
							/>
						</v-col>
						<v-col cols="12">
							<p style="line-height: 2em;">
								<span v-text="labels['content']"></span>
								<span v-if="state.errors.content" class="text-red ml-2">{{ `*${VALIDATE_MESSAGES.REQUIRED(labels['content'])}`  }}</span>
							</p>
							<EditorTiptap ref="tiptap"  :min_height="HEIGHT.S.toString()"
							:content="state.form.content"
							@changed="onContentChanged"
							/>
						</v-col>
						<v-col cols="12">
							<v-textarea :label="labels['summary']" auto-grow
							v-model="state.form.summary"
							/>
						</v-col>
						
						<v-col cols="6">
							<v-switch
							v-model="state.form.active"
							color="success" :label="status_text"
							/>
						</v-col>
						<v-col cols="6">
							
						</v-col>
					</v-row>
					<v-col cols="12">
						<CoreErrorList />
					</v-col> 
					<v-row>
						<v-col cols="6">
							<v-btn type="submit" color="success">
							{{ ACTION_TITLES.SAVE }}
							</v-btn>
						</v-col>
						<v-col cols="6" class="text-right">
							<v-btn @click.prevent="onRemove" color="error">
								{{ ACTION_TITLES.REMOVE }}
							</v-btn>
						</v-col>
					</v-row>
				</form>
			</v-container>
		</v-card-text>
	</v-card>
   
</template>