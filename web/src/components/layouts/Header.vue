<script setup>
import { MqResponsive } from 'vue3-mq'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { TOGGLE_DRAWER } from '@/store/mutations.type'
import { SITE_TITLE } from '@/config'

const store = useStore()

const title = ref(SITE_TITLE)

function toggleDrawer() {
   store.commit(TOGGLE_DRAWER)
}

function home() {
	console.log('home')
}
</script>

<template>
	<v-app-bar>
		<template v-slot:prepend>
			<v-app-bar-nav-icon @click.stop="toggleDrawer" />
		</template>
		<MqResponsive target="md+">
			<v-app-bar-title class="pl-0">
				<a class="text-h5" href="#" @click.prepend="home" style="text-decoration: none; color: black;">
					<v-avatar image="@/assets/logo.png" rounded="0" class="me-3">
					</v-avatar>
					<span class="text-h5" style="line-height: 1.5rem;">{{ title }}</span>
				</a>
			</v-app-bar-title>
		</MqResponsive>
		<MqResponsive target="sm-">
         <v-app-bar-title>
				<a href="#" @click.prepend="home" style="text-decoration: none; color: black;">
					<v-avatar image="@/assets/logo.png" rounded="0" class="me-3">
					</v-avatar>
				</a>
			</v-app-bar-title>
      </MqResponsive>
		<v-spacer />
		<v-btn icon>
			<v-icon>mdi-magnify</v-icon>
		</v-btn>
		<v-btn icon>
			<v-icon>mdi-dots-vertical</v-icon>
		</v-btn>

		<v-btn icon>
			<v-avatar>
				<v-img
				src="https://cdn.vuetifyjs.com/images/john.jpg"
				alt="John"
				></v-img>
			</v-avatar>
		</v-btn>
	</v-app-bar>
</template>
