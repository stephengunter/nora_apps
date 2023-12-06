<script setup>
import { ref, reactive, computed } from 'vue'
const name = 'MenuDrawer'
const props = defineProps({
   item: {
      type: Object,
      default: null
   },
   active: {
      type: Boolean,
      default: false
   },
   color: {
      type: String,
      default: 'info'
   }
})
const emit = defineEmits(['select'])

const subMenuItems  = computed(() => {
   if(props.item.subs && props.item.subs.length) return props.item.subs.filter(subItem => subItem.meta.menu)
   return []
})
function isActive(item) {
   if(item.active) return true
   let subActive = item.subs.find(subItem => subItem.active)
   if(subActive) return true
   return false
}
function select(item) {
   emit('select', item)
}
</script>
<template>
   <v-list-group v-if="subMenuItems.length > 0" :value="item.name">
      <template v-slot:activator="{ props }">
         <v-list-item v-bind="props" @click.prepend="select(item)"
         :active="active" 
         :prepend-icon="item.meta.icon"
         :title="item.meta.title"
         />
      </template>
      <v-list-item
      v-for="subItem in subMenuItems"  
      :active="active" 
      :key="subItem.name"
      :title="subItem.meta.title"
      :prepend-icon="subItem.meta.icon"
      :value="subItem.name"
      :to="subItem.path"
      />

   </v-list-group>
   <v-list-item  v-else :prepend-icon="item.meta.icon" :title="item.meta.title"
   :active="active" :to="item.path"
   />
</template>
