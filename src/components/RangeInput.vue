<template>
	<label :id="name">
		<span class="label">{{ label }} ({{ model }})</span>
		<input type="range" v-model.number="model"
		       :min="min" :max="max" :step="step" />
	</label>
</template>

<script setup lang="ts">
	import { Ref } from 'vue';

	export interface IControlData {
		name: string;
		label: string;
		model: Ref<number>;
		min?: number;
		max?: number;
		step?: number;
	}

	const { controlData } = defineProps<{ controlData: IControlData }>();

	const { name, label, model, min = 1, max = 10, step = 1 } = controlData;
</script>

<style scoped lang="scss">
	label {
		display:     block;
		margin-top:  32px;
		font-style:  italic;
		font-weight: 500;
	}

	input {
		display:    block;
		margin-top: 12px;
	}
</style>
