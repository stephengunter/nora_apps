<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { LOGIN } from '@/store/actions.type'
import { SET_ERROR, CLEAR_ERROR, 
   
} from '@/store/mutations.type'
import { ERRORS, WARNING, SUCCESS } from '@/consts'
import { onError } from '@/utils'

const name = 'LoginView'
const store = useStore()
const route = useRoute()
const router = useRouter()

const initialState = {
   returnUrl: '',
   returnQuery: '',
   form: {
      email: '',
      password: ''
   }
}
const state = reactive({
   ...initialState,
})
const labels = {
	'email':'Email',
	'password':'Password'
}

const rules = {
   email: { required, email },
   password: { required }
}
const $externalResults = ref({})
const v$ = useVuelidate(rules, state.form, { $externalResults })

onBeforeMount(() => {
	if(route.query) {
      state.returnUrl = route.query.returnUrl ? route.query.returnUrl : ''
      let copy = JSON.parse(JSON.stringify(route.query))
      delete copy['returnUrl']
      state.returnQuery = copy
   }
})

function onSubmit() {
	v$.value.$validate().then(valid => {
      if(!valid) return
      Bus.emit(SUCCESS, 'Login Success.')
      
	})
}
function onLoginFailed() {
   store.commit(SET_ERROR, {
      'login': ['Logon Failed.']
   })
}

//#region google
function callback(data) {
   if(data.credential) {
      onGoogleLoginSuccess(data.credential)
   } else {
      onError({ msg: '登入失敗' })
   }
}
function onGoogleLoginSuccess(token) {
   store.dispatch(LOGIN, token)
   .then(onSuccess)
   .catch(error => onError({ msg: '登入失敗' }))
}
function onSuccess() {
   if(state.returnUrl) {
      if(state.returnQuery) router.push({ path: state.returnUrl, query: state.returnQuery })
      else router.push({ path: state.returnUrl })
   } 
   else router.push({ path: '/' })
}
//#endregion
function onInputChanged()
{
   store.commit(CLEAR_ERROR)
}
</script>


<template>
   <CoreContainer>
      <v-card>
         <v-card-title class="font-weight-black">
            <h2 style="margin:8px">登入</h2>            
         </v-card-title>
         <v-card-text>
            <form @submit.prevent="onSubmit" @input="onInputChanged">
               <v-row>
                  <v-col cols="12">
                     <v-text-field
                     v-model="state.form.email"
                     :error-messages="v$.email.$errors.map(e => e.$message)"
                     :label="labels['email']"
                     @input="v$.email.$touch"
                     @blur="v$.email.$touch"
                     />
                     <v-text-field
                     v-model="state.form.password"
                     :error-messages="v$.password.$errors.map(e => e.$message)"
                     :label="labels['password']"
                     @input="v$.password.$touch"
                     @blur="v$.password.$touch"
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
            
            <!-- <v-row>
               <v-col cols="12">
                  <GoogleLogin :callback="callback"/>
               </v-col>
            </v-row> -->
           
            
         </v-card-text>
      </v-card>
   </CoreContainer>
</template>