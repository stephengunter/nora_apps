<script setup>
import { MqResponsive } from 'vue3-mq'
import { ref, watch, onBeforeMount} from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()
onBeforeMount(() => {
	console.log(route.params.id)
})

watch(
	() => route.params.id,
	() => {
		console.log(route.params.id)
	}
)

</script>

<template>
	<v-container>
		<MqResponsive target="md+">
			<v-row>
				<v-col cols="12">
					<div class="text-h4">
						Header
					</div>
					<div class="text-subtitle-1">
						subtitle
					</div>
				</v-col>
			</v-row>
			<v-row>
      <v-col cols="4">
         <v-icon icon="mdi-clock" size="xs"></v-icon>
         <span class="font-weight-light bt-item ml-1">2022-3-10</span>
      </v-col>
      <v-col cols="4">
         <v-icon icon="mdi-eye-circle" size="xs"></v-icon>
         <span class="font-weight-light bt-item ml-1">345</span>
      </v-col>
      <v-col cols="4">
         <v-icon icon="mdi-comment" size="xs"></v-icon>
         <span class="font-weight-light bt-item ml-1">21</span>
      </v-col> 
   </v-row>
		</MqResponsive>
	</v-container>
</template>



<style scoped>
.bt-item {
   font-size:small;
}
</style>