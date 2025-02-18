import Car             from './Car.ts';
import Siren           from './Siren.ts';
import ambulanceImgSrc from '/assets/ambulance.png';

export default class Ambulance extends Car {
	readonly #siren: Siren;

	constructor( x: number, y: number, width: number, length: number ) {
		super( x, y, width, length, ambulanceImgSrc );
		this.#siren = new Siren();
		this.#addListeners();
	}

	#addListeners() {
		document.addEventListener( 'keypress', event => {
			if ( event.key === ' ' )
				this.#siren.togglePlay();
		} );
	}

	update(): void {
		super.update();
		this.#siren.update( this.x, this.y );
	}

	draw( ctx: CanvasRenderingContext2D ): void {
		super.draw( ctx );
		this.#siren.draw( ctx );
	}
}

