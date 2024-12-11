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
	#control-panel {
		--vPadding:    58px;
		--bgColor:     #eef2fb;
		--bColor:      slateGray;
		--bSize:       3px;
		--bMain:       var(--bSize) solid var(--bColor);
		--bSec:        calc(var(--bSize) - 1px) solid var(--bColor);
		--bRadSize:    8px;
		--bRad:        0 var(--bRadSize) var(--bRadSize) 0;

		position:      absolute;
		top:           42px;
		padding:       var(--vPadding) 32px;
		background:    var(--bgColor);
		border:        var(--bMain);
		border-radius: var(--bRad);
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
		border:        var(--bMain);
		border-left:   var(--bSec);
		border-radius: var(--bRad);
		background:    var(--bgColor);
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
		margin-top: var(--vPadding);
	}

	.info {
		text-align: center;
		margin-top: var(--vPadding);
		font-size:  small;
		font-style: italic;
	}
</style>
