<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { SET_DRAWER } from '@/store/mutations.type'
import { SITE_TITLE } from '@/config'

const name = 'LayoutDrawer'
const store = useStore()
const location = useRoute()

const title = ref(SITE_TITLE)
const data = reactive({
   open: []
})

const menus = computed(() => store.getters.menus)

const drawer = computed({
	get() {
		return store.getters.drawer
	},
	set(val) {
		store.commit(SET_DRAWER, val)
	}
})

function isActive(item) {
   if(location) {
      if(location.name === item.name) return true
      if(item.meta.children && item.meta.children.includes(location.name)) return true
   }
   return false
}

</script>

<template>
   <v-navigation-drawer id="app-drawer" v-model="drawer" 
   app theme="dark" 
   v-bind="$attrs"
   >
      <v-list dense nav>
         <v-list-item>
            <template v-slot:prepend>
               <v-avatar size="36px">
                  <v-img src="@/assets/logo.png"></v-img>
               </v-avatar>
            </template>
            <v-list-item-title class="text-h6" style="line-height: 1.5rem;"  v-text="title"></v-list-item-title>
         </v-list-item>
      </v-list>

      <v-divider class="mb-2" />

      <v-list v-model:opened="data.open">
         <MenuDrawer  v-for="item in menus" :key="item.name" 
         :item="item" :active="isActive(item)"
         />
      </v-list>   
      

   </v-navigation-drawer>
</template>
