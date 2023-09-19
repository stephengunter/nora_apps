<script setup>
import { ref } from 'vue'
const model = ref({
   id: 45,
   title: 'test-title'
})
</script>
<template>
   <v-row>
      <v-col cols="12">
      <ArticleEdit :model="model" />
   </v-col>
   </v-row>
</template>