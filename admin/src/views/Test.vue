<script setup>
import { reactive } from 'vue'
import { DIALOG_MAX_WIDTH } from '@/config'

const data = reactive({
	image: {
		active: false
	}
})
  
function image(val) {
	data.image.active = val
}

function onImageSelected(model) {
	console.log(model)
	image(false)
}
</script>

<template>
	<div>
		<v-row>
			<v-col cols="12">
				<v-btn icon="mdi-image" @click.prevent="image(true)" />
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-tooltip text="Tooltip">
					<template v-slot:activator="{ props }">
						<v-btn icon="mdi-account" v-bind="props"></v-btn>
					</template>
				</v-tooltip>
			</v-col>
		</v-row>
		<v-dialog v-model="data.image.active" :width="DIALOG_MAX_WIDTH" persistent>
			<PickerImage 
			@cancel="image(false)" 
			@selected="onImageSelected" 
			/>
		</v-dialog>
	</div>
 </template>