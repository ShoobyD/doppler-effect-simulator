<template>
	<div id="controls-panel">
		<h2>Controls</h2>
		<RangeInput class="range-input" v-for="controlData in controlsData" :key="controlData.name"
		            :controlData="controlData"></RangeInput>
	</div>
</template>

<script setup lang="ts">
	import RangeInput, { IControlData } from './RangeInput.vue';

	defineProps<{ controlsData: IControlData[] }>();
</script>

<style scoped lang="scss">
	$v-padding: 58px;

	#controls-panel {
		position:      absolute;
		top:           42px;
		padding:       $v-padding 32px;
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
		font-size:           xx-large;
	}

	.range-input {
		margin-top: $v-padding;
	}
</style>
