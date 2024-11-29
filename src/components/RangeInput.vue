<template>
	<label :id="controlData.name">
		<span class="label">{{ controlData.label }} ({{ controlData.model }})</span>
		<input type="range" :min="controlData.min || 1" :max="controlData.max || 10"
		       :step="controlData.step || 1" v-model.number="controlData.model.value" />
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

	defineProps<{ controlData: IControlData }>();
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
