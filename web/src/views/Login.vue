<script setup>
import { MqResponsive, useMq } from 'vue3-mq'
import { ref, onMounted, onUnmounted } from 'vue'

// const mq = useMq()
// console.log('mq', mq)
const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

const handleResize = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
}
onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>
<template>
  <div>
    <v-row>
          <v-col cols="12">
            <h1 class="ml-2" style="display: inline">article.title </h1>
            <span style="font-size: x-small">2023-11-09</span>
          </v-col>
          <v-col
            cols="12"
            ><hr />
          </v-col>
		  
          <v-col cols="4" class="text-center">
            <v-img  alt="Smiley face"
               src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
               cover
            />
            <!-- <v-img class="ml-2 mb-3" :src="article.image" height="200px"/> -->
          </v-col>
		  
          <v-col cols="8">
            <v-row class="fill-height mr-2" dense>
              <v-col cols="12">
                <p>article.header </p>
              </v-col>
		  
              <v-col cols="12" align-self="end">
                <a>More</a>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
  </div>
   
</template>