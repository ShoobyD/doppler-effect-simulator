import SoundWave    from './SoundWave.ts';
import { distance } from '../utils/math.ts';

export default class Microphone {
	x: number;
	y: number;

	constructor( x: number, y: number ) {
		this.x = x;
		this.y = y;
	}

	update( soundWaves: SoundWave[] ): void {
		soundWaves.forEach( soundWave => {
			soundWave.ripples.forEach( ( ripple, i, ripples ) => {
				if ( ripple.heard )
					return;
				const currDistance = distance( this, ripple );
				if ( currDistance <= ripple.radius ) {
					ripple.heard = true;
					if ( ripple === soundWave ) {
						soundWave.play();
					} else {
						// Assuming [mic, rippleA, rippleB] are collinear for simplicity.
						const prevDistance = distance( this, ripples[ i - 1 ] );
						if ( currDistance - prevDistance ) {
							soundWave.changeFrequency( prevDistance - currDistance );
						}
					}
				}
			} );
		} );
	}

	draw( ctx: CanvasRenderingContext2D ): void {
		ctx.beginPath();
		ctx.font         = '50px Arial';
		ctx.textAlign    = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText( '🎙️', this.x, this.y );
	}
}

