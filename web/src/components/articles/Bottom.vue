<script setup>
import { ref } from 'vue'

const date = ref(new Date('2022-01-22'))
</script>
<template>
   <v-row>
      <v-col cols="4">
         <v-icon icon="mdi-clock" size="xs"></v-icon>
         <timeago class="font-weight-light bt-item ml-1" :datetime="date" />
      </v-col>
      <v-col cols="4">
         <v-icon icon="mdi-eye-circle" size="xs"></v-icon>
         <span class="font-weight-light bt-item ml-1">345</span>
      </v-col>
      <v-col cols="4">
         <v-icon icon="mdi-comment" size="xs"></v-icon>
         <span class="font-weight-light bt-item ml-1">21</span>
      </v-col> 
   </v-row>
</template>

<style scoped>
.bt-item {
   font-size:small;
}
</style>