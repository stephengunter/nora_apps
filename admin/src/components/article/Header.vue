<script setup>
import { MqResponsive } from 'vue3-mq'
import { ref } from 'vue'

const name = 'ArticlesHeader'
const props = defineProps({
	params: {
      type: Object,
      default: null
   }
})
const active_options = ref([{
	value: 1,
	text: '上架中'
},{
	value: 0,
	text: '已下架'
}])
const emit = defineEmits(['changed', 'create'])

function create() {
	emit('create')
}
function onChanged() {
	emit('changed')
}
</script>

<template>
	<MqResponsive target="md+">
		<v-row>
			<v-col cols="8">
				<v-radio-group v-model="params.active" inline @update:modelValue="onChanged">
					<v-radio v-for="(item, index) in active_options" :key="index"
					:label="item.text" :value="item.value"
					/>
				</v-radio-group>
			</v-col>
			<v-col cols="4" class="text-right">
				<v-tooltip text="新增">
					<template v-slot:activator="{ props }">
						<v-btn icon="mdi-plus" v-bind="props" color="info"
						@click="create"
						/>
					</template>
				</v-tooltip>
			</v-col>
		</v-row>
	</MqResponsive>
	<MqResponsive target="sm-">
		<v-fade-transition mode="out-in">
			<v-row>
				<v-col cols="12">
					small
				</v-col>
			</v-row>
		</v-fade-transition>
	</MqResponsive>
   
</template>