<template>
   <v-menu v-if="user" offset-y>
      <template v-slot:activator="{ props }">
         <v-btn icon v-bind="props">
            <v-avatar v-if="pictureError" size="36" color="indigo">
               <span style="color:white">{{ user.name }}</span>
            </v-avatar>
            <v-avatar v-else size="36">
               <v-img :src="user.picture" @error="pictureError = true" />
            </v-avatar>
         </v-btn>
      </template>
      <v-list min-width="180"  max-width="300">   
         <v-list-item v-for="(item, index) in items" :key="index" @click.prevent="onSelected(item.name)">
            <template v-slot:prepend>
               <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text" />
         </v-list-item>
      </v-list>
   </v-menu>
</template>

<script>
import { LOGOUT } from '@/store/actions.type'

export default {
   name: 'MenuUser',
   props: {
      user: {
         type: Object,
         default: null
      }
   },
   data: () => ({
      pictureError: false,
      items: [{
         text: '登出', name: LOGOUT, icon: 'mdi-logout-variant'
      },{
         text: 'Profile', name: 'profile', icon: 'mdi-account'
      }]   
   }),
   methods:{
      onSelected(name) {
         if(name === LOGOUT) this.logout()
         else if(name === 'profile') this.profile()
      },
      logout() {
         this.$store.dispatch(LOGOUT)
         .then(this.redirect({ name: 'login' }))
      },
      profile() {
         this.redirect({ path: '/profile' })
      },
      redirect(params) {
         this.$router.push(params)
      }
   }
}
</script>
