<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { SHOW_PHOTO, SHOW_TERM, SHOW_NOTE } from '@/store/actions.type'
import { DIALOG_MAX_WIDTH } from '@/config'
import { onError } from '@/utils'

const name = 'LayoutShow'
const store = useStore()
const photo = ref({
   active: false,
   model: null,
   maxWidth: DIALOG_MAX_WIDTH
})
const term = ref({
   model: null,
   active: false,
   maxWidth: DIALOG_MAX_WIDTH
})
const note = ref({
   model: null,
   active: false,
   maxWidth: DIALOG_MAX_WIDTH
})
const responsive = computed(() => store.getters.responsive)
const contentMaxWidth = computed(() => store.getters.contentMaxWidth)
Bus.on(SHOW_PHOTO, showPhoto)
Bus.on(SHOW_TERM, setTerm)

onMounted(() => {
	window.addEventListener(SHOW_TERM, onShowTerm)
   window.addEventListener(SHOW_NOTE, onShowNote)
})
onBeforeUnmount(() => {
	window.removeEventListener(SHOW_TERM, onShowTerm);
   window.removeEventListener(SHOW_NOTE, onShowNote);
})
function showPhoto(photo) {
   if(photo) {
      photo.value.model = photo;
      photo.value.active = true;
   }else {
      photo.value.model = null;
      photo.value.active = false;
   }
}
function onShowTerm(e) {
   if(e) {
      let id = e.detail.id;
      store.dispatch(SHOW_TERM, id)
      .then(model => {
         setTerm(model);
      })
      .catch(error => {
         onError(error);
      })
   }else {
      term.value.model = null
      term.value.active = true;
   }
   
}
function setTerm(model) {
   if(model) {
      term.value.model = model;
      term.value.active = true;
   }else {
      term.value.model = null;
      term.value.active = false;
   }
}
function onShowNote(e) {
   if(e) {
      let id = e.detail.id;
      store.dispatch(SHOW_NOTE, id)
      .then(model => {
         setNote(model);
      })
      .catch(error => {
         onError(error);
      })
   }else {
      note.value.model = null
      note.value.active = true;
   }
}
function setNote(model) {
   if(model) {
      note.value.model = model;
      note.value.active = true;
   }else {
      note.value.model = null;
      note.value.active = false;
   }
}
</script>
<template>
<div>
   <v-dialog v-model="photo.active" :max-width="photo.maxWidth">
      <v-card v-if="photo.model">
         <core-close-icon-button @close="showPhoto(null)" />
         <v-card-text>
            <div class="text-center" style="padding-top:36px;">
               <v-img class="img-center" :src="photo.model.id | photoIdUrl"
                  :max-width="photo.model.width"
               />
               <span v-if="photo.model.title" style="font-size: 16px; display: inline-block;" class="mt-3" v-text="photo.model.title"></span>
            </div>
         </v-card-text>
      </v-card>
   </v-dialog>
   <v-dialog v-model="term.active" :max-width="term.maxWidth">
      <v-card v-if="term.model">
         <v-card-title v-if="term.model.subject">
            <h3>{{ term.model.subject.title }}  {{ term.model.title }}</h3>
         </v-card-title>
         <v-card-text>
            <TermItem :item="term.model" 
            :show_title="false"
            />
         </v-card-text>
      </v-card>
   </v-dialog>
   <v-dialog v-model="note.active" :max-width="note.maxWidth">
      <v-card v-if="note.model">
         <core-close-icon-button @close="setNote(null)" />
         <v-card-title v-if="note.model.title">
			   <h3>{{ note.model.title }}</h3>
         </v-card-title>
         <v-card-text>
            <NoteRead :model="note.model"/>
         </v-card-text>
      </v-card>
   </v-dialog>
</div>      
</template>