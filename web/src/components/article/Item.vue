<template>
	<v-card>
		<v-card-title>
			<h3>{{ model.title }}</h3>
			<v-spacer v-if="model.title" />

			<span class="subtitle-1" style="color:#3F51B5">{{ model.date }}</span>
		</v-card-title>
		<v-card-text>
			<article v-html="model.content">
			</article>
		</v-card-text>
	</v-card>
</template>

<script>

export default {
	name: 'ArticleItem',
	props: {
		model: Object
	}
}
</script>

