<script setup>
const name = 'App'

</script>

<template>
	<v-app id="app">
		<LayoutToolbar />

		<LayoutDrawer />

		<LayoutView />

		<LayoutFeedback />
		
	</v-app>
</template>


<style lang="scss">
	@import "assets/styles/app.scss"
</style>
