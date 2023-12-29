<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { url, required, helpers } from '@vuelidate/validators'
import { VALIDATE_MESSAGES } from '@/consts'
import { DIALOG_MAX_WIDTH } from '@/config'

const name = 'PickerImage'
const emit = defineEmits(['selected', 'cancel'])

const sources = [{ value: '1', text: '外部'}]
const labels = {'source':'來源', 'url':'Url'}

const form = reactive({
	source: '',
	url: ''
})
const rules = {
	url: { 
      required: helpers.withMessage(VALIDATE_MESSAGES.REQUIRED('Url'), required), 
      url: helpers.withMessage(VALIDATE_MESSAGES.WRONG_FORMAT_OF('Url'), url)
   }
}

const v$ = useVuelidate(rules, form)


onBeforeMount(() => {
   form.source = sources[0].value
})

function onSubmit() {
	v$.value.$validate().then(valid => {
		if(valid) emit('selected', form)
	})
}
function cancel() {
   emit('cancel')
}


</script>
<template>
	<v-card :max-width="DIALOG_MAX_WIDTH">
      <v-toolbar flat height="32px">
         <v-spacer />
         <v-btn icon="mdi-window-close" variant="text" 
         @click.prevent="cancel"
         />
      </v-toolbar>
      <v-card-text>
         <form @submit.prevent="onSubmit">
            <v-select 
            :items="sources" item-title="text"
            :label="labels['source']"
            v-model="form.source"
            />
            <v-text-field
            :label="labels['url']"
            v-model="form.url"
            :error-messages="v$.url.$errors.map(e => e.$message)"
            @input="v$.url.$touch"
            @blur="v$.url.$touch"
            />
            <v-btn class="float-right" type="submit" color="success">確定</v-btn>
         </form>
    	</v-card-text>   
   </v-card>
</template>