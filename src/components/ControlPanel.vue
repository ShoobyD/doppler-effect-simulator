<template>
	<div id="controls-panel">
		<h2>Controls</h2>
		<RangeInput v-for="controlData in controlsData" :key="controlData.name" :controlData="controlData"></RangeInput>
	</div>
</template>

<script setup lang="ts">
	import RangeInput, { IControlData } from './RangeInput.vue';

	defineProps<{ controlsData: IControlData[] }>();
</script>

<style scoped lang="scss">
	#controls-panel {
		position:      absolute;
		top:           42px;
		padding:       54px 32px;
		background:    #eef2fb;
		border:        3px solid slateGray;
		border-radius: 0 8px 8px 0;
		border-left:   none;
	}

	h2 {
		text-align:          center;
		margin:              0;
		line-height:         1;
		color:               White;
		-webkit-text-stroke: 1px #101053;
	}
</style>
