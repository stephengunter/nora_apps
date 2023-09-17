<script setup>
import { MqResponsive } from 'vue3-mq'

</script>
<template>
   <div>
      <MqResponsive target="md+">
         <v-row>
            <v-col cols="4">
               <a href="#">
                  <v-img class="mt-1 mb-1" alt="Smiley face" src="https://random.imagecdn.app/300/200" cover />
               </a>
            </v-col>
            <v-col cols="8">
               <v-row class="fill-height" dense>
                  <v-col cols="12">
                     <a href="#" class="text-h4">
                        Header
                     </a>
                     <div class="text-subtitle-1">
                        subtitle
                     </div>
                  </v-col>
                  <v-col cols="12" align-self="end">
                     <articles-bottom />
                  </v-col>
               </v-row>
            </v-col>
         </v-row>
      </MqResponsive>
      <MqResponsive target="sm-">
         <v-row>
            <v-col>
               <v-card>
                  <v-img
                  src="https://picsum.photos/350/165?random"
                  max-height="125"
                  cover
                  class="bg-grey-lighten-2"
                  >
                     <v-card-title class="text-white" style="white-space: normal;">
                        max-height with covermax-height with covermax-height with covermax-height with cover
                     </v-card-title>
                  </v-img>
                  <v-card-text>
                     subtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitle
                  </v-card-text>
                  <v-card-actions>
                     <articles-bottom />
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