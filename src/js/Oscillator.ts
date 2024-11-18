const audioCtx = new AudioContext();

const peakTime = 0.1;

export default class Oscillator {
	duration: number;

	#oscillatorNode = new OscillatorNode( audioCtx, { type: 'sawtooth' } );
	#gainNode       = audioCtx.createGain();

	constructor( duration: number ) {
		this.duration = duration;

		this.#oscillatorNode.connect( this.#gainNode );
		this.#gainNode.connect( audioCtx.destination );
	}

	setLoudness( loudness: number ): void {
		this.#gainNode.gain.setValueAtTime( 0, audioCtx.currentTime );
		this.#gainNode.gain.setValueAtTime( loudness, audioCtx.currentTime + peakTime );
		this.#gainNode.gain.setValueAtTime( 0, audioCtx.currentTime + this.duration );
	}

	setFrequency( frequency: number ): void {
		this.#oscillatorNode.frequency.setValueAtTime( frequency, audioCtx.currentTime );
	}

	play(): void {
		this.#oscillatorNode.start();
		this.#oscillatorNode.stop( audioCtx.currentTime + this.duration );
	}
}

