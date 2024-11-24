import Oscillator  from '../Oscillator.ts';
import { doppler } from '../utils/math.ts';

const soundSpeed    = 10;
const maxWaveRadius = 5000;
const epsilon       = 0.02;
const expFactor     = -maxWaveRadius / Math.log( epsilon );

export interface IRipple {
	x: number;
	y: number;
	radius: number;
	heard: boolean;
}

export default class SoundWave implements IRipple {
	x: number;
	y: number;
	frequency: number;
	color: string;
	duration: number; // in ms

	#createTime: number;
	#oscillator: Oscillator;

	radius: number     = 0;
	ripples: IRipple[] = [ this ];
	heard: boolean     = false;
	finished: boolean  = false;

	constructor( x: number, y: number, frequency: number, color: string, duration: number ) {
		this.x         = x;
		this.y         = y;
		this.duration  = duration;
		this.frequency = frequency;
		this.color     = color;

		this.#createTime = Date.now();
		this.#oscillator = new Oscillator( duration / 1000 );
	}

	get loudness(): number {
		return Math.exp( -this.radius / expFactor );
	}

	update( x: number, y: number ): void {
		this.ripples.forEach( wave => wave.radius += soundSpeed );

		// Add ripple if still playing
		if ( Date.now() - this.#createTime < this.duration ) {
			this.ripples.push( { x, y, radius: 0, heard: false } );
			this.finished = false;
		} else if ( !this.finished ) {
			this.finished = this.ripples.every( ripple => ripple.heard );
		}

		if ( !this.finished ) {
			window.eventBus.emit( 'soundUpdate', this );
		}
	}

	play(): void {
		this.#oscillator.setLoudness( this.loudness );
		this.#oscillator.setFrequency( this.frequency );
		this.#oscillator.play();
	}

	changeFrequency( rippleSpeed: number ): void {
		const newFrequency = doppler( this.frequency, rippleSpeed, soundSpeed );
		this.#oscillator.setFrequency( newFrequency );
	}

	draw( ctx: CanvasRenderingContext2D ): void {
		if ( this.radius > maxWaveRadius )
			return;

		ctx.globalAlpha = this.loudness;
		ctx.strokeStyle = this.color;
		this.ripples.forEach( ( { x, y, radius } ) => {
			ctx.beginPath();
			ctx.arc( x, y, Math.max( radius, 0 ), 0, Math.TAU );
			ctx.stroke();
		} );
	}
}

