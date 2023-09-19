<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import _ from 'lodash'

const name = 'TablePager'
const props = defineProps({
   model: {
      type: Object,
      default: null
   },
   list_key: {
      type: String,
      default: 'viewList'
   },
   can_page: {
      type: Boolean,
      default: true
   },
   row_options: {
      type: Array,
      default: () => [10,25,50]
   },
   responsive: {
      type: Boolean,
      default: false
   }
})
const emit = defineEmits(['page_changed', 'size_changed'])

const page = ref(1)
const size = ref(10)

watch(() => _.cloneDeep(props.model), (currentValue, oldValue) => {   
   init()
})

onBeforeMount(init)

const isEmpty = computed(() => {
   if(props.model) return props.model.totalItems < 1
   return true
})
const first = computed(() => {
   return isEmpty.value ? 0 : (props.model.pageSize * (props.model.pageNumber - 1) + 1)
})
const last = computed(() => {
   return isEmpty.value ? 0 : (first.value + props.model[props.list_key].length - 1)
})
const summary = computed(() => `${first.value} - ${last.value} of ${props.model.totalItems}`)

function init() {
   page.value = props.model.pageNumber
   size.value = props.model.pageSize
}
function onPageChanged() {
   emit('page_changed', page)
}     
function onPageSizeChanged(size) {
   console.log('onPageSizeChanged', size)
   emit('size_changed', size)
}
</script>

<template>
   <v-row v-if="can_page">
      <v-col cols="6" class="mt-3">
         <v-menu location="end"  >
            <template v-slot:activator="{ props }">
               <v-btn variant="plain" color="primary" v-bind="props">
                  Rows: {{ size }}
               </v-btn>
            </template>
            <v-list>   
               <v-list-item v-for="item in row_options" :key="item" @click.prevent="onPageSizeChanged(item)">
               {{ item }}
               </v-list-item>
            </v-list>
         </v-menu>
      </v-col>
      <v-col cols="" class="text-left">
         <span class="mt-3 ml-3 mr-3" v-text="summary">
         </span>
         <v-pagination  class="d-inline-flex"
         v-model="page"
         :length="model.totalPages"
         :total-visible="responsive ? 3 : 7"
         @input="onPageChanged"
         />
      </v-col>
   </v-row>
   <v-row v-else>
      <v-col cols="12">
         <span class="ml-3 mr-3" v-text="summary">
         </span>
      </v-col>
   </v-row>
</template>
