<!-- Original controller by Javier:  https://codepen.io/JavRok/pen/pgJagr -->
<template>
	<div class="range-wrapper" :id="name">
		<div class="label">{{ label }} <span class="current-value">{{ model }}</span></div>
		<div class="range-box">
			<div title="Decrease" class="control-minus" @click="decrease">
				<svg viewBox="0 0 24 24">
					<line x1="08" y1="12" x2="16" y2="12" stroke-width="3" stroke-linecap="square" />
				</svg>
			</div>
			<div class="range">
				<input type="range" v-model.number="model" ref="rangeInputRef"
				       :min="min" :max="max" :step="step" />
				<span class="legend-min">{{ min }}</span>
				<span class="legend-max">{{ max }}</span>
			</div>
			<div title="Increase" class="control-plus" @click="increase">
				<svg viewBox="0 0 24 24">
					<line x1="08" y1="12" x2="16" y2="12" stroke-width="3" stroke-linecap="square" />
					<line x1="12" y1="08" x2="12" y2="16" stroke-width="3" stroke-linecap="square" />
				</svg>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		Ref,
		ref,
	} from 'vue';

	export interface IControlData {
		name: string;
		label: string;
		model: Ref<number>;
		min?: number;
		max?: number;
		step?: number;
		crement?: number;
	}

	const { controlData } = defineProps<{ controlData: IControlData }>();

	const { name, label, model, min = 1, max = 10, step = 1, crement } = controlData;

	const rangeInputRef = ref<HTMLInputElement>();

	const increase = crementFactory( 'Up' );
	const decrease = crementFactory( 'Down' );

	function crementFactory( type: 'Up' | 'Down' ) {
		return function() {
			rangeInputRef.value![ `step${ type }` ]( crement );
			rangeInputRef.value!.dispatchEvent( new Event( 'input' ) );
		};
	}
</script>

<style scoped lang="scss">
	$range-box-width:     200px;
	$thumb-radius:        7px; // Actual size is $thumb-radius*$thumb-radius-scale
	$thumb-radius-scale:  3; // We do this to make the thumb overlay the sides of the track
	$theme-color:         #009fdf;
	$theme-color-dark:    #545454;
	$track-height:        4px;
	$border-radius:       3px;
	$bottom-border:       4px;
	$slider-padding:      15px;
	$rule-height:         6px;
	$rule-color:          #cccccc;
	$side-control-height: 35px;

	.label {
		font-size:   large;
		font-style:  italic;
		font-weight: 500;
	}

	.current-value {
		background:          $theme-color;
		border-radius:       $border-radius;
		margin-inline-start: 4px;
		padding:             4px 12px;
		font-family:         Helvetica, Arial, sans-serif;
		font-style:          normal;
		font-weight:         bold;
		color:               white;
		line-height:         22px;
		white-space:         nowrap;
		transition:          left 0.045s linear;
	}


	/*******    The wrapper for the range input    *******/
	.range-box {
		display:          flex;
		position:         relative;
		background-color: #f4f4f4;
		padding:          0;
		margin:           18px;
		overflow:         visible;
		width:            $range-box-width;

		&:after {
			display:          block;
			position:         absolute;
			bottom:           0;
			left:             0;
			content:          "";
			width:            100%;
			background-color: #b3b3b3;
			height:           $bottom-border;
		}
	}


	/*******    Extra controls on the side    *******/
	@mixin side-control() {
		display:          flex;
		background-color: #009fdf;
		stroke:           White;
		min-width:        $side-control-height;
		cursor:           pointer;
		border-bottom:    $bottom-border solid #0073a1;
		z-index:          1;

		&:hover {
			transform:           translateY(1px);
			background-color:    #00adf2;
			border-bottom-width: $bottom-border - 1px;
		}
		&:active {
			transform:           translateY(3px);
			background-color:    #009fdf;
			border-bottom-width: 2px;
		}
	}

	%no-selection {
		-webkit-touch-callout: none;
		-webkit-user-select:   none;
		-moz-user-select:      none;
		-ms-user-select:       none;
		user-select:           none;
	}

	.control-minus {
		// display: inline-block;
		@include side-control();
		left:                      -$side-control-height;
		line-height:               $side-control-height - $bottom-border;
		border-top-left-radius:    $border-radius;
		border-bottom-left-radius: $border-radius;
		@extend %no-selection;
	}

	.control-plus {
		@include side-control();
		right:                      -$side-control-height;
		border-top-right-radius:    $border-radius;
		border-bottom-right-radius: $border-radius;
		@extend %no-selection;
	}


	/*******    Input legends    *******/
	@mixin legend-text() {
		font-family: Helvetica, Arial, sans-serif;
		font-weight: bold;
		font-size:   11px;
		color:       $rule-color;
		margin-top:  - $slider-padding - $bottom-border + 1px;
	}

	.legend-min {
		@include legend-text();
		float:       left;
		margin-left: $slider-padding - 2px;
	}

	.legend-max {
		@include legend-text();
		float:        right;
		margin-right: $slider-padding - 4px;
	}


	@mixin thumb {
		position:      relative;
		height:        $thumb-radius;
		width:         $thumb-radius;
		// Trick to make it overflow on the sides
		transform:     scale($thumb-radius-scale);
		margin-top:    calc(0px - $thumb-radius / 2 + $track-height / 2);
		border-radius: 500px;
		background:    $theme-color;
		border:        0;
		cursor:        pointer;
		z-index:       2;
	}

	@mixin track {
		background-color: $theme-color-dark;
		height:           $track-height;
		border-radius:    $border-radius;
	}

	input[type='range'] {
		width:               100%;
		box-sizing:          border-box;
		-webkit-appearance:  none;
		height:              $slider-padding*2 + $track-height; // IE's thumb gets cut
		background:          transparent;
		position:            relative;
		cursor:              pointer;
		background:          linear-gradient(90deg, $rule-color 1px, rgba(238, 238, 238, 0) 1px) repeat-x content-box,
		                     linear-gradient(90deg, $rule-color 1px, rgba(238, 238, 238, 0) 1px) repeat-x content-box;
		background-size:     25% $rule-height, calc(100% - 5px) $rule-height*2;
		background-position: 1px 30%, 1px 20%;
		padding:             0 $slider-padding;
		overflow:            visible;


		/*******    The Thumb    *******/
		&::-webkit-slider-thumb {
			@include thumb();
			-webkit-appearance: none;
		}

		&::-moz-range-thumb {
			@include thumb();
		}

		&::-ms-thumb {
			@include thumb();
			// BUG: In IE the scale*3 gets hidden under the padding (facepalm)
			transform:     none;
			margin-top:    -2px;
			height:        $thumb-radius*$thumb-radius-scale;
			width:         $thumb-radius*$thumb-radius-scale;
			border-radius: $thumb-radius*$thumb-radius-scale;
		}


		/*******    The Track    *******/
		&::-webkit-slider-runnable-track {
			@include track();
			// transform: scaleX(0.9);

		}

		&::-moz-range-track {
			@include track();
		}

		&::-ms-track {
			background:   transparent;
			border-color: transparent;
			color:        transparent;
		}

		&::-ms-fill-lower {
			@include track();
			background-color: $theme-color;
		}

		&::-ms-fill-upper {
			@include track();
		}

		&:focus {
			outline: none;
		}
	}
</style>