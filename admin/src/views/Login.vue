<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { LOGIN } from '@/store/actions.type'
import { SET_ERROR, CLEAR_ERROR } from '@/store/mutations.type'   

import { ERRORS, WARNING, SUCCESS } from '@/consts'
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
      .then(data => {
         console.log(data)
      })
      .catch(error => onLoginError(error))
	})
}
function onLoginFailed() {
   onError({
      'login': ['Logon Failed.']
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
   if(errors) store.commit(SET_ERROR, Object.values(error)[0])
   else onErrors()
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
   store.commit(CLEAR_ERROR)
}
</script>


<template>
   <CoreContainer>
      <v-card max-width="448" >
         <v-card-title class="font-weight-black">
            <h2 style="margin:8px">登入</h2>            
         </v-card-title>
         <v-card-text>
            <form @submit.prevent="onSubmit" @input="onInputChanged">
               <v-row>
                  <v-col cols="12">
                     <v-text-field variant="outlined" prepend-inner-icon="mdi-email-outline"
                     v-model="state.form.username"
                     :error-messages="v$.username.$errors.map(e => e.$message)"
                     :label="labels['username']"
                     @input="v$.username.$touch"
                     @blur="v$.username.$touch"
                     />
                     <!-- <v-text-field 
                     :append-inner-icon="state.password.visible ? 'mdi-eye-off' : 'mdi-eye'"
                     :type="state.password.visible ? 'text' : 'password'"
                     v-model="state.form.password"
                     :error-messages="v$.password.$errors.map(e => e.$message)"
                     :label="labels['password']"
                     @input="v$.password.$touch"
                     @blur="v$.password.$touch"
                     @click:append-inner="state.password.visible = !state.password.visible"
                     /> -->
                     <v-text-field
        :append-inner-icon="state.password.visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="state.password.visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="state.password.visible = !state.password.visible"
      ></v-text-field>

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