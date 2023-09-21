<template>
   <v-overlay :model-value="loading" class="align-center justify-center">
         <v-progress-circular color="primary" indeterminate size="48">
         </v-progress-circular>
         <p class="mt-3">
         {{ loadingText }}
         </p>
   </v-overlay>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
   name: 'LayoutLoading',
   computed:{
      ...mapState({
			loading: state => state.app.loading,
			loadingText: state => state.app.loadingText
		})
	},
}
</script>

<style>

</style>