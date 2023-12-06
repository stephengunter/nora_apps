<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { DIALOG_MAX_WIDTH } from '@/config'

const store = useStore()

</script>

<template>
   <v-app>
      <layouts-header />
      <layouts-drawer />
      <v-main id="layout-view">
         <router-view />
      </v-main>
      <layouts-loading />
   </v-app>
</template>

