<script setup>
import { MqResponsive } from 'vue3-mq'
import { ref, watch, onBeforeMount} from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { isEmptyObject } from '@/utils'
import { ARTICLE_DETAILS } from '@/store/actions.type'

const route = useRoute()
const store = useStore()

const model = ref({})


onBeforeMount(() => {
	let id = route.params.id
	fetchData(id)
})
function fetchData(id) {
   store.dispatch(ARTICLE_DETAILS, id)
	.then(article => {
		model.value = article
	})
   .catch(error => {
      console.log(error);
   })
}

</script>

<template>
	<v-container>
		<MqResponsive target="md+">
			<v-row>
				<v-col cols="9">
					<v-row>
                  <v-col cols="12">
                     <p class="text-h5">
								{{ model.title }}
							</p>
							<!-- <div class="text-subtitle-1">
								{{ model.summary}}
							</div> -->
                  </v-col>
						<v-col cols="12">
                     <articles-bottom :model="model" />
                  </v-col>
						<v-col cols="12">
							<article v-html="model.content" />
                  </v-col>
               </v-row>
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
						<p class="text-h5">
							{{ model.title }}
						</p>
						<!-- <div class="text-subtitle-1">
							{{ model.summary }}
						</div> -->
					</v-col>
					<v-col cols="12">
						<articles-bottom :model="model" />
					</v-col>
					<v-col cols="12">
						<article v-html="model.content" />
					</v-col>
				</v-row>
         </v-fade-transition>
		</MqResponsive>
	</v-container>
</template>



<style scoped>
.bt-item {
   font-size:small;
}
</style>