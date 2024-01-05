<script setup>
import { reactive, computed, watch, onBeforeMount} from 'vue'
import { useStore } from 'vuex'
import { MqResponsive } from 'vue3-mq'
import { useRoute, useRouter } from 'vue-router'
import { ARTICLE_DETAILS } from '@/store/actions.type'
import { converCustomTags, isEmptyObject } from '@/utils'

const name = 'ArticlesView'
const store = useStore()
const route = useRoute()
const router = useRouter()

const initialState = {
   model: {
		title: '',
		content: ''
	}
}
const state = reactive({
   ...initialState,
})
const content = computed(() => converCustomTags(state.model.content))

watch(route, init)
onBeforeMount(init)

function init() {
	fetchData(route.params.id ? route.params.id : 0)
}
function fetchData(id) {
   store.dispatch(ARTICLE_DETAILS, id)
	.then(model => state.model = { ...model })
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
                     <!-- <p class="text-h5">
								{{ model.title }}
							</p> -->
							<!-- <div class="text-subtitle-1">
								{{ model.summary}}
							</div> -->
                  </v-col>
						<!-- <v-col cols="12">
                     <articles-bottom :model="model" />
                  </v-col>
						<v-col cols="12">
							<article v-html="model.content" />
                  </v-col> -->
               </v-row>
				</v-col>
				<v-col cols="3">
					<sides-right />
				</v-col>
			</v-row>

		</MqResponsive>
		<MqResponsive target="sm-">
			<v-fade-transition mode="out-in">
				<v-row dense>
					<v-col cols="12">
						<p class="text-h5">
							{{ state.model.title }}
						</p>
					</v-col>
					<v-col cols="12">
						<ArticlesBottom :model="state.model" />
					</v-col>
					<v-col cols="12">
						<article v-html="content">
   					</article>
					</v-col>
				</v-row>
         </v-fade-transition>
		</MqResponsive>
	</v-container>
</template>

