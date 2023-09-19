<script setup>
import { computed } from 'vue'
const name = 'CoreConfirmation'
const props = defineProps({
   type: {
      type: String,
      default: ''
   },
   title: {
      type: String,
      default: ''
   },
   text: {
      type: String,
      default: ''
   },
   ok_text: {
      type: String,
      default: '確定'
   },
   cancel_text: {
      type: String,
      default: '取消'
   },
   on_ok: {
      type: Function,
      default: null
   },
   on_cancel: {
      type: Function,
      default: null
   }
})

const emit = defineEmits(['ok', 'cancel'])

const noAction = computed(() => !props.on_ok && !props.on_cancel)

function ok() {
   if(props.on_ok) props.on_ok();
   else emit('ok');
}
function cancel() {
   if(props.on_cancel) props.on_cancel();
   else emit('cancel');
}

</script>
<template>
   <v-card >
      <v-card-title v-if="type === 'error'" class="bg-red text-h5">
         <v-icon color="white" class="mr-3">
            mdi-alert-circle
         </v-icon>
         <span style="color: #fff;">
            {{ title  }}
         </span>
      </v-card-title>
      <v-card-title v-else v-show="title">
         <h3>{{ title }}</h3>
      </v-card-title>
      <slot>
         <v-card-text v-if="text">
         {{ text }}
         </v-card-text>
      </slot>
      <v-card-actions v-show="!noAction" style="min-height: 75px;">
         <v-spacer></v-spacer>
         <v-btn text @click="cancel">
            {{ cancel_text }}
         </v-btn>
         <v-btn color="green darken-1" text @click="ok">
            {{ ok_text }}
         </v-btn>
      </v-card-actions>
   </v-card>
</template>