<script setup>
import { reactive, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { LOGIN } from '@/store/actions.type'
import { onError } from '@/utils'

const name = 'LoginView'
const store = useStore()
const route = useRoute()
const router = useRouter()

const data = reactive({
   returnUrl: '',
   returnQuery: null
})

onBeforeMount(() => {
	if(route.query) {
      data.returnUrl = route.query.returnUrl ? route.query.returnUrl : ''
      let copy = JSON.parse(JSON.stringify(route.query))
      delete copy['returnUrl']
      data.returnQuery = copy
   }
})

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
   if(data.returnUrl) {
      if(data.returnQuery) router.push({ path: data.returnUrl, query: data.returnQuery })
      else router.push({ path: data.returnUrl })
   } 
   else router.push({ path: '/' })
}
</script>


<template>
   <CoreContainer>
      <v-card>
         <v-card-title class="font-weight-black">
            <h2 style="margin:8px">登入</h2>            
         </v-card-title>
         <v-card-text>
            <v-row>
               <v-col cols="12">
                  <GoogleLogin :callback="callback"/>
               </v-col>
            </v-row>
         </v-card-text>
      </v-card>
   </CoreContainer>
</template>