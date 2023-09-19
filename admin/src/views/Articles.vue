<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'

const name = 'ArticlesView'

const model = reactive({
	id: 32, title: ''
})


</script>

<template>
	<ArticleEdit :model="model" />
   
</template>