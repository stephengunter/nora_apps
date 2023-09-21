<script setup>
import { MqResponsive } from 'vue3-mq'
import { ref, watch, onBeforeMount, computed} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { FETCH_ARTICLES } from '@/store/actions.type'

const router = useRouter()
const store = useStore()

const articles = computed(() => store.getters.articles)

onBeforeMount(() => {
	fetchData()
})
function fetchData() {
   let params = { }
   store.dispatch(FETCH_ARTICLES, params)
   .catch(error => {
      console.log(error);
   })
}
function onSelected(id) {
   console.log('onSelected', id)
   router.push({ name: 'article', params: { id } })
}
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
               <articles-item v-for="article in articles"
               :model="article"
               @selected="onSelected"
               />
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
                  <articles-item v-for="article in articles"
                  :model="article"
                  @selected="onSelected"
                  />
               </v-col>
            </v-row>
         </v-fade-transition>
      </MqResponsive>

   </v-container>
</template>
