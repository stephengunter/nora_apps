<script setup>
import { MqResponsive } from 'vue3-mq'
import { ref, onMounted, onUnmounted } from 'vue'
</script>

<template>
	<v-container>
		<MqResponsive target="md+">
			Articles
		</MqResponsive>
	</v-container>
</template>
