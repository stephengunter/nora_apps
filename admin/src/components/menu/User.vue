<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { LOGOUT } from '@/store/actions.type'
import { shortName } from '@/utils'
import { ROUTE_NAMES } from '@/consts'

const name = 'MenuUser'
const props = defineProps({
   user: {
      type: Object,
      default: null
   }
})
const router = useRouter()
const store = useStore()

const initialState = {
   pictureError: false,
   items: [{
      title: '登出', name: LOGOUT, icon: 'mdi-logout-variant'
   },{
      title: 'Profiles', name: 'profiles', icon: 'mdi-account'
   }] 
}

const noPicture = computed(() => {
   if(!props.user.picture) return true
   if(state.pictureError) return true
   return false
})

const state = reactive({
   ...initialState,
})

function onSelected(name) {
   if(name === LOGOUT) logout()
   else if(name === 'profiles') profiles()
}
function logout() {
   store.dispatch(LOGOUT)
   .then(() => router.push({ name: ROUTE_NAMES.LOGIN }))   
}
function profiles() {
   router.push({ name: 'profiles' })
}

</script>
<template>
   <v-menu>
      <template v-slot:activator="{ props }">
         <v-btn icon v-bind="props">
            <v-avatar v-if="noPicture" color="indigo">
               {{ shortName(user) }}
            </v-avatar>
            <v-avatar v-else>
               <v-img @error="() => state.pictureError = true"
               :src="user.picture"
               :alt="user.name"
               />
            </v-avatar>
        </v-btn>
      </template>
      <v-list min-width="180"  max-width="300">   
         <v-list-item v-for="(item, index) in state.items" :key="index" @click.prevent="onSelected(item.name)">
            <template v-slot:prepend>
               <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.title" />
         </v-list-item>
      </v-list> 
   </v-menu>
</template>
