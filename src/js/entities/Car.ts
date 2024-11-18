import {
	changeAbsoluteValue,
	clamp,
	polarToCartesian,
}                  from '../utils/math.ts';
import { drawDot } from '../utils/canvas.ts';
import Controller  from '../Controller.ts';

const maxSpeed            = 3.7;
const acceleration        = 0.17;
const angularAcceleration = 0.03;
const friction            = 0.05;
const carImgSrc           = 'ambulance.png';
const drawDots            = true;

export default class Car {
	x: number;
	y: number;
	width: number;
	length: number;
	img?: HTMLImageElement;

	direction: number = -Math.TAU / 4;
	speed: number     = 0;

	#controller: Controller;

	constructor( x: number, y: number, width: number, length: number ) {
		this.x      = x;
		this.y      = y;
		this.width  = width;
		this.length = length;

		this.#controller = new Controller();

		if ( carImgSrc ) {
			this.img     = new Image();
			this.img.src = carImgSrc;
		}
	}

	update(): void {
		this.#updatetSpeed();
		this.#updateDirection();
		this.#updatePosition();
	}

	#updatetSpeed(): void {
		// Read controller
		if ( this.#controller.up ) {
			this.speed = clamp( this.speed + acceleration, -maxSpeed, maxSpeed );
		}
		if ( this.#controller.down ) {
			this.speed = clamp( this.speed - acceleration, -maxSpeed, maxSpeed );
		}

		// Add friction
		this.speed = changeAbsoluteValue( this.speed, -friction );
		if ( Math.abs( this.speed ) < friction ) {
			this.speed = 0;
		}
	}

	#updateDirection(): void {
		// Read controller
		if ( this.#controller.left ) {
			this.direction -= Math.sign( this.speed ) * angularAcceleration;
		}
		if ( this.#controller.right ) {
			this.direction += Math.sign( this.speed ) * angularAcceleration;
		}
	}

	#updatePosition(): void {
		const { x: dx, y: dy } = polarToCartesian( this.speed, this.direction );
		this.x += dx;
		this.y += dy;
	}

	draw( ctx: CanvasRenderingContext2D ): void {

		ctx.save();
		ctx.translate( this.x, this.y );
		ctx.rotate( this.direction );

		if ( this.img ) {
			ctx.drawImage(
				this.img,
				-this.length / 2,
				-this.width / 2,
				this.length,
				this.width,
			);
		} else {
			const frontBumperRatio = 0.17;

			// Car back
			ctx.fillStyle = 'black';
			ctx.fillRect( -this.length / 2, -this.width / 2, this.length * ( 1 - frontBumperRatio ), this.width );

			// Car front
			ctx.fillStyle = 'red';
			ctx.fillRect( -this.length / 2 + this.length * ( 1 - frontBumperRatio ), -this.width / 2, frontBumperRatio * this.length, this.width );
		}

		if ( drawDots ) {
			// Dots
			drawDot( ctx, 0, 0 );
			drawDot( ctx, -this.length / 2, -this.width / 2 );
			drawDot( ctx, -this.length / 2, this.width / 2 );
			drawDot( ctx, this.length / 2, -this.width / 2 );
			drawDot( ctx, this.length / 2, this.width / 2 );
		}

		ctx.restore();
	}
}

