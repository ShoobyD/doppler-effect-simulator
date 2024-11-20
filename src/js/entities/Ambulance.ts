import Car             from './Car.ts';
import ambulanceImgSrc from '/ambulance.png';

export default class Ambulance extends Car {
	constructor( x: number, y: number, width: number, length: number ) {
		super( x, y, width, length, ambulanceImgSrc );
	}

	update(): void {
		super.update();
	}

	draw( ctx: CanvasRenderingContext2D ): void {
		super.draw( ctx );
	}
}

