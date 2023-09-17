<script setup>
import { MqResponsive } from 'vue3-mq'

</script>

<template>
   <v-container>
      <MqResponsive target="md+">
         <v-row>
            <v-col cols="9">
               <v-row>
                  <v-col>
                     <carousels-headline />
                  </v-col>
               </v-row>
               <articles-item />
            </v-col>
            <v-col cols="3">
               <sides-right />
            </v-col>
         </v-row>
      </MqResponsive>
      <MqResponsive target="sm-">
         <v-fade-transition mode="out-in">
            <v-row>
               <v-col cols="12">
                  <articles-item />
                  <articles-item />
               </v-col>
            </v-row>
         </v-fade-transition>
      </MqResponsive>

   </v-container>
</template>
