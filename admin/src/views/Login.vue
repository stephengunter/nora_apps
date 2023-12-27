<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { LOGIN } from '@/store/actions.type'
import { SET_ERRORS, CLEAR_ERRORS } from '@/store/mutations.type'   
import { DIALOG_MAX_WIDTH } from '@/config'
import { resolveErrorData, onErrors, onWarning } from '@/utils'

const name = 'LoginView'
const store = useStore()
const route = useRoute()
const router = useRouter()

const initialState = {
   returnUrl: '',
   returnQuery: '',
   form: {
      username: '',
      password: ''
   },
   password:{
      visible: false
   }
}
const state = reactive({
   ...initialState,
})
const labels = {
	'username':'Email',
	'password':'Password'
}

const rules = {
   username: { required, email },
   password: { required }
}
const $externalResults = ref({})
const v$ = useVuelidate(rules, state.form, { $externalResults })

onBeforeMount(() => {
   const data = {'': ['Login Failed.']}
   console.log(Object.values(data)[0])
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
      store.dispatch(LOGIN, state.form)
      .then(onLoginSuccess)
      .catch(error => onLoginError(error))
	})
}

//#region google
function callback(data) {
   if(data.credential) {
      onGoogleLoginSuccess(data.credential)
   } else {
      onError({ title: '登入失敗', text: 'damn' })
   }
}
function onGoogleLoginSuccess(token) {
   store.dispatch(LOGIN, token)
   .then(onLoginSuccess)
   .catch(error => {
      console.log(error)
   })
}

//#endregion
function onLoginError(error) {
   let errors = resolveErrorData(error)
   if(errors) store.commit(SET_ERRORS, Object.values(errors))
   else onErrors(error)
}
function onLoginSuccess() {
   if(state.returnUrl) {
      if(state.returnQuery) router.push({ path: state.returnUrl, query: state.returnQuery })
      else router.push({ path: state.returnUrl })
   } 
   else router.push({ path: '/' })
}
function onInputChanged()
{
   store.commit(CLEAR_ERRORS)
}
</script>


<template>
   <CoreContainer>
      <v-card :max-width="DIALOG_MAX_WIDTH" >
         <v-card-title class="font-weight-black">
            <h2 style="margin:8px">登入</h2>            
         </v-card-title>
         <v-card-text>
            <form @submit.prevent="onSubmit" @input="onInputChanged">
               <v-row>
                  <v-col cols="12">
                     <v-text-field variant="outlined" prepend-inner-icon="mdi-email-outline"
                     density="compact" placeholder="Enter your email"                     
                     v-model="state.form.username"
                     :error-messages="v$.username.$errors.map(e => e.$message)"                     
                     @input="v$.username.$touch"
                     @blur="v$.username.$touch"
                     />
                     <v-text-field variant="outlined" prepend-inner-icon="mdi-lock-outline"
                     density="compact" placeholder="Enter your password"
                     :append-inner-icon="state.password.visible ? 'mdi-eye-off' : 'mdi-eye'"
                     :type="state.password.visible ? 'text' : 'password'"
                     v-model="state.form.password"
                     @input="v$.password.$touch"
                     @blur="v$.password.$touch"
                     @click:append-inner="state.password.visible = !state.password.visible"
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