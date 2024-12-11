<template>
	<div class="control-panel" :class="{ open }">
		<h2>Controls</h2>
		<RangeInput class="range-input" v-for="controlData in controlsData" :key="controlData.name"
		            :controlData="controlData"></RangeInput>
		<div class="info">
			<a href="https://github.com/ShoobyD/doppler-effect-simulator">View code on GitHub</a>
		</div>
		<button class="toggle-btn" @click="open = !open">⚙️</button>
	</div>
</template>

<script setup lang="ts">
	import { ref }                      from 'vue';
	import RangeInput, { IControlData } from './RangeInput.vue';

	defineProps<{ controlsData: IControlData[] }>();

	const open = ref( window.innerWidth > 800 );
</script>

<style scoped lang="scss">
	$v-padding: 58px;

	#control-panel {
		position:      absolute;
		top:           42px;
		padding:       $v-padding 32px;
		background:    #eef2fb;
		border:        3px solid slateGray;
		border-radius: 0 8px 8px 0;
		border-left:   none;
		transition:    700ms transform;
		z-index:       1;

		&:not(.open) {
			transform: translateX(-100%);
		}
	}

	.toggle-btn {
		position:      absolute;
		left:          100%;
		top:           0;
		width:         32px;
		height:        48px;
		padding:       0;
		border:        3px solid slateGray;
		border-left:   2px solid slateGray;
		border-radius: 0 8px 8px 0;
		background:    #eef2fb;
		cursor:        pointer;
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

	.info {
		text-align: center;
		margin-top: $v-padding;
		font-size:  small;
		font-style: italic;
	}
</style>
