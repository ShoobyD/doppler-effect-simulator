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
	interval: number; // in ms
	playing: boolean = false;

	soundWaves: SoundWave[] = [];
	#lastWaveTime: number   = 0;

	constructor( interval = 1000 ) {
		this.interval = interval;
		this.#addListeners();
	}

	#addListeners() {
		document.addEventListener( 'click', () => this.togglePlay() );
		document.addEventListener( 'keypress', event => {
			if ( event.key === ' ' )
				this.togglePlay();
		} );
	}

	togglePlay( play: boolean = !this.playing ) {
		this.playing = play;
	}

	update( x: number, y: number ) {
		this.soundWaves.forEach( soundWave => soundWave.update( x, y ) );
		this.#addNewWave( x, y );
	}

	#addNewWave( x: number, y: number ) {
		const timePassed = Date.now() - this.#lastWaveTime;
		if ( this.playing && timePassed > this.interval ) {
			const neeNaw    = this.soundWaves.length % 2? 'nee': 'naw';
			const frequency = frequencies[ neeNaw ];
			const color     = colors[ neeNaw ];
			this.soundWaves.push( new SoundWave( x, y, frequency, color, this.interval / 1000 ) );
			this.#lastWaveTime = Date.now();
		}
	}

	draw( ctx: CanvasRenderingContext2D ) {
		this.soundWaves.forEach( soundWave => soundWave.draw( ctx ) );
	}
}

