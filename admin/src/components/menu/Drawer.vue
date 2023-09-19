
<template>
   <v-list-group v-if="hasSubMenu" :value="item.name">
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

<script>
export default {
   name: 'MenuDrawer',
   props: {
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
	},
   computed: {
      subMenuItems() {
         if(this.item.subs && this.item.subs.length) return this.item.subs.filter(subItem => subItem.meta.menu)
         return []
      },
      hasSubMenu() {
         return this.subMenuItems.length > 0
      }
   },
   methods: {
      isActive(item) {
         if(item.active) return true
         let subActive = item.subs.find(subItem => subItem.active)
         if(subActive) return true
         return false
      },
      select(item) {
         this.$emit('select', item)
      }
   }
}
</script>