<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { LOGIN } from '@/store/actions.type'
import { SET_ERROR, CLEAR_ERROR } from '@/store/mutations.type'  

const name = 'ProfilesView'
const store = useStore()


const initialState = {
   form: {
      name: '',
      phone: ''
   }
}
const state = reactive({
   ...initialState,
})
const labels = {
	'name':'Name',
	'phone':'Phone'
}

const rules = {
   name: { required },
   phone: { required }
}
const $externalResults = ref({})
const v$ = useVuelidate(rules, state.form, { $externalResults })


onBeforeMount(() => {
	console.log('onBeforeMount')
})

function onInputChanged()
{
   store.commit(CLEAR_ERROR)
}

</script>
<template>
   <CoreContainer>
      <v-card>
         <v-card-title class="font-weight-black">
            <h2 style="margin:8px">Profiles</h2>              
         </v-card-title>
         <v-card-text>
            <form @submit.prevent="onSubmit" @input="onInputChanged">
               <v-row>
                  <v-col cols="12">
                     <v-text-field :label="labels['name']"                
                     v-model="state.form.name"
                     :error-messages="v$.name.$errors.map(e => e.$message)"                     
                     @input="v$.name.$touch"
                     @blur="v$.name.$touch"
                     />
                     <v-text-field :label="labels['phone']"                   
                     v-model="state.form.phone"
                     :error-messages="v$.phone.$errors.map(e => e.$message)"                     
                     @input="v$.phone.$touch"
                     @blur="v$.phone.$touch"
                     />

                  </v-col>
                  <v-col cols="12">
                     <v-btn type="submit" color="success">
                     Submit
                     </v-btn>
                  </v-col> 
                  <v-col cols="12">
                     <CoreErrorList />
                  </v-col>  
               </v-row>
            </form>
         </v-card-text>
      </v-card>
   </CoreContainer>
</template>