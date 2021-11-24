<template>
   <v-app-bar app color="red" dark>
      <v-avatar>
         <img :src="require('@/assets/logo.png')">
      </v-avatar>
      <v-toolbar-title class="site-title">{{ title }}</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <menu-user v-if="currentUser" :user="currentUser"
      />
   </v-app-bar>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import { SITE_TITLE } from '@/config';

export default {
   name: 'TheHeader',
   data() {
      return {
         title: SITE_TITLE
      }
   },
   computed:{
      ...mapGetters(['currentUser', 'appActions', 'userMenus'])
   }
};
</script>

<style scoped>
.site-title{
   font-size : 2.2rem!important;
   padding-left: 0.5em;
}
</style>