import Oscillator from '../Oscillator.ts';

const soundSpeed = 10;

type TNeeNaw = 'nee' | 'naw';

const frequencies = {
	'nee': 700,
	'naw': 500,
};
const colors      = {
	'nee': 'Red',
	'naw': 'Blue',
};

export interface IRipple {
	x: number;
	y: number;
	radius: number;
	heard: boolean;
}

export default class SoundWave implements IRipple {
	x: number;
	y: number;
	duration: number;
	frequency: number;
	color: string;
	createTime: number;
	#oscillator: Oscillator;

	radius: number     = 0;
	ripples: IRipple[] = [ this ];
	heard: boolean     = false;

	constructor( x: number, y: number, neeNaw: TNeeNaw, duration: number ) {
		this.x        = x;
		this.y        = y;
		this.duration = duration;

		this.frequency   = frequencies[ neeNaw ];
		this.color       = colors[ neeNaw ];
		this.createTime  = Date.now();
		this.#oscillator = new Oscillator( duration );
	}

	update( x: number, y: number ): void {
		this.ripples.forEach( wave => wave.radius += soundSpeed );

		// Add ripple if still playing
		if ( Date.now() - this.createTime < this.duration * 1000 ) {
			this.ripples.push( { x, y, radius: 0, heard: false } );
		}
	}

	play(): void {
		const loudness = Math.exp( -this.radius / 500 );
		this.#oscillator.setLoudness( loudness );
		this.#oscillator.setFrequency( this.frequency );
		this.#oscillator.play();
	}

	changeFrequency( rippleSpeed: number ): void {
		const newFrequency = this.frequency * soundSpeed / ( soundSpeed - rippleSpeed / 50 );
		this.#oscillator.setFrequency( newFrequency );
	}

	draw( ctx: CanvasRenderingContext2D ): void {
		ctx.strokeStyle = this.color;
		this.ripples.forEach( ( { x, y, radius } ) => {
			ctx.beginPath();
			ctx.arc( x, y, Math.max( radius, 0 ), 0, Math.TAU );
			ctx.stroke();
		} );
	}
}

