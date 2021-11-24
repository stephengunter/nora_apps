<template>
   <v-menu v-if="user" offset-y>
      <template v-slot:activator="{ on }">
         <v-btn icon v-on="on">
            <v-avatar size="48" color="indigo">
               <span class="white--text headline">{{ userName }}</span>
            </v-avatar>
         </v-btn>
      </template>
      <v-card class="mx-auto" max-width="300" tile >
         <v-list>
            <v-list-item @click.prevent="logout">
               <v-list-item-icon>
                     <v-icon>mdi-logout-variant</v-icon>
               </v-list-item-icon>
               <v-list-item-content>
                  <v-list-item-title>登出</v-list-item-title>
               </v-list-item-content>
            </v-list-item>
         </v-list>
      </v-card>
   </v-menu>
</template>

<script>
import { LOGOUT } from '@/store/actions.type';

export default {
   name: 'UserMenu',
   props: {
      user: {
         type: Object,
         default: null
      }
   },
   data() {
      return {
         
      }
   },
   computed:{
      userName() {
         if(this.user && this.user.name) return this.user.name.substring(0, 2);
         return '';
      }
   },
   methods:{
      logout(){
         this.$store.dispatch(LOGOUT)
         .then(() => {
            if(this.$route.name === 'login') window.location.reload();
            else this.$router.push({ name: 'login' });
         })
      }
   }
}
</script>

<style>

</style>