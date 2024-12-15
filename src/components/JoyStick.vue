<template>
	<div class="joystick" :class="{ active }">
		<div class="head" ref="joystickHeadRef"
		     :style="headPosition"
		     @touchstart="active = true"
		></div>
		<div class="arrow top"></div>
		<div class="arrow bottom"></div>
		<div class="arrow left"></div>
		<div class="arrow right"></div>
	</div>
</template>

<script setup lang="ts">
	import {
		onMounted,
		ref,
	} from 'vue';
	import {
		cartesianToPolar,
		polarToCartesian,
		offset,
		norm,
		scale,
	} from '../helpers/math.ts';

	const circleRadius = 40;
	const headRadius   = circleRadius / 3;

	const active            = ref( false );
	const headPosition      = ref( { top: '', left: '' } );
	const headStartPosition = ref( { x: 0, y: 0 } );

	const joystickHeadRef = ref<HTMLCanvasElement>();

	onMounted( () => {
		const { x, y, width, height } = joystickHeadRef.value!.getBoundingClientRect();
		headStartPosition.value       = {
			x: x + width / 2,
			y: y + height / 2,
		};
	} );

	window.addEventListener( 'touchend', touchendHandler );
	window.addEventListener( 'touchmove', touchmoveHandler );

	function touchendHandler( event: TouchEvent ) {
		active.value       = false;
		headPosition.value = {
			left: '0px',
			top : '0px',
		};
	}

	function touchmoveHandler( event: TouchEvent ) {
		if ( !active.value )
			return;

		const maxRadius       = circleRadius - headRadius / 2;
		const currentPosition = getTouchCoords( event );
		const positionOffset  = offset( currentPosition, headStartPosition.value );

		// Cartesian scale version
		// const offsetRadius    = norm( positionOffset );
		// const offsetClamped   = scale( positionOffset, Math.min( 1, maxRadius / offsetRadius ) );

		const { radius, theta } = cartesianToPolar( positionOffset );
		const offsetClamped     = polarToCartesian( {
			radius: Math.min( radius, maxRadius ),
			theta,
		} );

		headPosition.value = {
			left: offsetClamped.x + 'px',
			top : offsetClamped.y + 'px',
		};
	}

	function getTouchCoords( event: TouchEvent ) {
		return {
			x: event.touches[ 0 ].clientX,
			y: event.touches[ 0 ].clientY,
		};
	}
</script>

<style scoped lang="scss">
	@use 'sass:color';
	@use 'sass:map';

	.joystick {
		--mainColor:        #333;
		--headColor:        radial-gradient(circle at 100% -20%, #f30, #a20 50%, #310 80%);
		--circleSize:       v-bind("2 * circleRadius + 'px'");
		--headSize:         v-bind("2 * headRadius + 'px'");
		--arrowBorderSize:  12px;
		--arrowDistance:    calc(var(--circleSize) / 2 * (sqrt(2) - 1) - var(--arrowBorderSize));;

		position:           fixed;
		bottom:             48px;
		left:               48px;
		display:            flex;
		align-items:        center;
		justify-content:    center;
		background-color:   var(--mainColor);
		width:              var(--circleSize);
		height:             var(--circleSize);
		border-radius:      50%;
		opacity:            0.5;
		z-index:            1;

		&.active {
			opacity: 0.7;
		}

		.head {
			position:      relative;
			border-radius: 50%;
			width:         var(--headSize);
			height:        var(--headSize);
			background:    var(--headColor);
			z-index:       1;
		}

		&:not(.active) {
			.head {
				transition: all 200ms;
			}
		}

		$reverseDirections: (top: bottom, bottom: top, left: right, right: left);

		.arrow {
			position: absolute;
			width:    0;
			height:   0;
			border:   var(--arrowBorderSize) solid transparent;

			@each $direction in map.keys($reverseDirections) {
				$reverse: map.get($reverseDirections, $direction);
				&.#{$direction} {
					#{$reverse}:              calc(100% + var(--arrowDistance));
					border-#{$reverse}-color: var(--mainColor);
				}
			}
		}
	}
</style>
