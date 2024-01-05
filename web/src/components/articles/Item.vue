<script setup>
import { computed } from 'vue'
import { MqResponsive } from 'vue3-mq'
import { converCustomTags, isEmptyObject, removeHtmlTags } from '@/utils'

const props = defineProps({
   model: {
		type: Object,
		default: null
	}
})
const emit = defineEmits(['selected'])
const content = computed(() => {
   if(isEmptyObject(props.model)) return ''
   return converCustomTags(props.model.content)
})
const summary = computed(() => {
   if(isEmptyObject(props.model)) return ''
   if(props.model.summary) return props.model.summary
   
   let raw = removeHtmlTags(content.value)
   return `${raw.slice(0, 100)}...`
})

function select() {
   emit('selected', props.model.id);
}

</script>
<template>
   <div>
      <MqResponsive target="md+">
         <v-row>
            <v-col cols="4">
               <a href="#" @click.prevent="select" >
                  <v-img class="mt-1 mb-1" alt="Smiley face" src="https://random.imagecdn.app/300/200" cover />
               </a>
            </v-col>
            <v-col cols="8">
               <v-row class="fill-height" dense>
                  <v-col cols="12">
                     <a href="#" @click.prevent="select" class="text-h6">
                        {{ model.title }}
                     </a>
                     <div class="text-subtitle-1">
                        {{ summary}}
                     </div>
                  </v-col>
                  <v-col cols="12" align-self="end">
                     <articles-bottom :model="model" />
                  </v-col>
               </v-row>
            </v-col>
         </v-row>
      </MqResponsive>
      <MqResponsive target="sm-">
         <v-row>
            <v-col>
               <v-card>
                  <a href="#" @click.prevent="select" > 
                     <v-img
                     src="https://picsum.photos/350/165?random"
                     max-height="125"
                     cover
                     class="bg-grey-lighten-2"
                     >
                        <v-card-title class="text-white" style="white-space: normal;">
                           {{ model.title }}
                        </v-card-title>
                     </v-img>
                  </a>
                  <v-card-text>
                     <a href="#" @click.prevent="select" > 
                     {{ summary}}
                     </a>
                  </v-card-text>
                  <v-card-actions>
                     <articles-bottom :model="model" />
                  </v-card-actions>
               </v-card>
            </v-col>
         </v-row>
      </MqResponsive>
   </div>
</template>

<style scoped>
a {
   text-decoration: none;
   color: black;
}

a:hover {
   color: #f70d28;
}
</style>