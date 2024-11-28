<template>
	<ControlPanel :controlsData="controlsData"></ControlPanel>
	<div id="road">
		<canvas id="road-canvas" ref="roadCanvasRef"></canvas>
	</div>
</template>

<script setup lang="ts">
	import {
		computed,
		ref,
		watch,
		watchEffect,
	}                   from 'vue';
	import Road         from './entities/Road.ts';
	import Ambulance    from './entities/Ambulance.ts';
	import Microphone   from './entities/Microphone.ts';
	import ControlPanel from './components/ControlPanel.vue';
	import { expose }   from './helpers/general.ts';

	const carRatio  = 1.7;
	const carWidth  = 30;
	const carLength = carRatio * carWidth;
	const carMargin = 0.5 * carWidth;

	const laneWidth        = carWidth + 2 * carMargin;
	const roadLength       = 10 ** 5;
	const laneCount        = ref( 17 );
	const maxSpeed         = ref( 3.7 );
	const middleLane       = computed( () => Math.floor( ( laneCount.value - 1 ) / 2 ) );
	const middleLaneCanter = computed( () => road.getLaneCenter( middleLane.value ) );

	const roadCanvasRef = ref<HTMLCanvasElement>();
	const roadCtx       = ref<CanvasRenderingContext2D>();
	watch( roadCanvasRef, () => {
		roadCtx.value = roadCanvasRef.value?.getContext( '2d' )!;
		animate();
	} );

	// Init. items
	const road       = new Road( laneCount.value, laneWidth, roadLength, carMargin );
	const ambulance  = new Ambulance( middleLaneCanter.value, 0, carWidth, carLength );
	const microphone = new Microphone( middleLaneCanter.value, -400 );

	expose( {
		road,
		ambulance,
		microphone,
	} );


	// Controls
	const controlsData = [
		{
			name : 'lanes',
			label: '# of lanes',
			model: laneCount,
			max  : 20,
		},
		{
			name : 'speed',
			label: 'Max-speed',
			model: maxSpeed,
			max  : 12,
			step : 0.1,
		},
	];
	watchEffect( () => {
		road.setLaneCount( laneCount.value );
		ambulance.x = microphone.x = middleLaneCanter.value;
	} );
	watchEffect( () => {
		ambulance.setMaxSpeed( maxSpeed.value );
	} );


	function updateCanvasSize(): void {
		roadCanvasRef.value!.width  = road.width;
		roadCanvasRef.value!.height = window.innerHeight;
	}

	function animate(): void {
		updateCanvasSize();
		updateEntities();
		drawEntities();
		requestAnimationFrame( animate );
	}

	function updateEntities(): void {
		[ road, ambulance ].forEach( entity => entity.update() );
	}

	function drawEntities(): void {
		roadCtx.value!.save();
		roadCtx.value!.translate( 0, -ambulance.y + roadCanvasRef.value!.height * 0.8 );

		[ road, microphone, ambulance ].forEach( entity => entity.draw( roadCtx.value! ) );

		roadCtx.value!.restore();
	}
</script>

<style scoped lang="scss">
	#road {
		text-align: center;

		&-canvas {
			background: #b0cce1;
		}
	}
</style>

