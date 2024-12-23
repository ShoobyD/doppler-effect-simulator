import SoundWave from './SoundWave.ts';

const frequencies = {
	'nee': 700,
	'naw': 500,
};
const colors      = {
	'nee': 'Red',
	'naw': 'Blue',
};

export default class Siren {
	readonly interval: number; // in ms
	playing: boolean = false;

	readonly #soundWaves: SoundWave[] = [];
	#lastWaveTime: number             = 0;

	constructor( interval = 1000 ) {
		this.interval = interval;
	}

	togglePlay( play: boolean = !this.playing ): void {
		this.playing = play;
	}

	update( x: number, y: number ): void {
		this.#soundWaves.forEach( soundWave => soundWave.update( x, y ) );
		this.#addNewWave( x, y );
	}

	#addNewWave( x: number, y: number ): void {
		if ( !this.playing )
			return;

		if ( Date.now() - this.#lastWaveTime > this.interval ) {
			const neeNaw    = this.#soundWaves.length % 2? 'nee': 'naw';
			const frequency = frequencies[ neeNaw ];
			const color     = colors[ neeNaw ];
			this.#soundWaves.push( new SoundWave( x, y, frequency, color, this.interval ) );
			this.#lastWaveTime = Date.now();
		}
	}

	draw( ctx: CanvasRenderingContext2D ): void {
		this.#soundWaves.forEach( soundWave => soundWave.draw( ctx ) );
	}
}

