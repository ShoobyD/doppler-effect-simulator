import Car             from './Car.ts';
import Siren           from './Siren.ts';
import ambulanceImgSrc from '/ambulance.png';

export default class Ambulance extends Car {
	siren: Siren;

	constructor( x: number, y: number, width: number, length: number ) {
		super( x, y, width, length, ambulanceImgSrc );
		this.siren = new Siren();
	}

	update(): void {
		super.update();
		this.siren.update( this.x, this.y );
	}

	draw( ctx: CanvasRenderingContext2D ): void {
		super.draw( ctx );
		this.siren.draw( ctx );
	}
}

