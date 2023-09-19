<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { SET_DRAWER } from '@/store/mutations.type'
import { SITE_TITLE } from '@/config'

const name = 'LayoutDrawer'
const store = useStore()
const route = useRoute()
const router = useRouter()

const title = ref(SITE_TITLE)
const data = reactive({
   open: [],
   selected: null
})

const menus = computed(() => store.getters.menus);

watch(route, setSelected)

const drawer = computed({
	get() {
		return store.getters.drawer
	},
	set(val) {
		store.commit(SET_DRAWER, val)
	}
})

onBeforeMount(() => {
   setSelected(route)
})

function isActive(item) {
   if(data.selected) {
      return item.name === data.selected.name
   }
}
function onSeleted(item) {
   data.selected = item
   router.push({ path: item.path});
}

function setSelected(newRoute) {
   if(newRoute.name) {
      data.selected = menus.value.find(x => x.name === newRoute.name)
   }
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
         :item="item" :active="isActive(item)" @select="onSeleted" 
         />
      </v-list>   
      

   </v-navigation-drawer>
</template>
