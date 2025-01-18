import {
	changeAbsoluteValue,
	clamp,
	polarToCartesian,
}                  from '../helpers/math.ts';
import { drawDot } from '../helpers/canvas.ts';
import Controller  from '../util-classes/Controller.ts';

const defaultMaxSpeed               = 3.7;
const defaultMaxAcceleration        = 0.17;
const defaultMaxAngularAcceleration = 0.03;
const friction                      = 0.05;

export default class Car {
	x: number;
	y: number;
	readonly width: number;
	readonly length: number;

	maxSpeed: number       = defaultMaxSpeed;
	maxAcceleration        = defaultMaxAcceleration;
	maxAngularAcceleration = defaultMaxAngularAcceleration;

	direction: number           = -Math.TAU / 4;
	speed: number               = 0;
	acceleration: number        = 0;
	angularAcceleration: number = 0;

	readonly #img?: HTMLImageElement;
	readonly #controller: Controller;

	constructor( x: number, y: number, width: number, length: number, carImgSrc?: string ) {
		this.x      = x;
		this.y      = y;
		this.width  = width;
		this.length = length;

		this.#controller = new Controller();

		if ( carImgSrc ) {
			this.#img     = new Image();
			this.#img.src = carImgSrc;
		}
	}

	setMaxSpeed( maxSpeed: number ): void {
		this.maxSpeed = maxSpeed;
	}

	update(): void {
		this.#updateAcceleration();
		this.#updateSpeed();
		this.#updateDirection();
		this.#updatePosition();
	}

	#updateAcceleration(): void {
		// Read controller
		// Linear acceleration
		if ( this.#controller.up ) {
			this.acceleration = this.maxAcceleration;
		} else if ( this.#controller.down ) {
			this.acceleration = -this.maxAcceleration;
		} else this.acceleration = 0;

		// Angular acceleration
		if ( this.#controller.left ) {
			this.angularAcceleration = -this.maxAngularAcceleration;
		} else if ( this.#controller.right ) {
			this.angularAcceleration = this.maxAngularAcceleration;
		} else this.angularAcceleration = 0;
	}

	#updateSpeed(): void {
		// Accelerate
		this.speed = clamp( this.speed + this.acceleration, -this.maxSpeed, this.maxSpeed );

		// Add friction
		this.speed = changeAbsoluteValue( this.speed, -friction );
		if ( Math.abs( this.speed ) < friction ) {
			this.speed = 0;
		}
	}

	#updateDirection(): void {
		this.direction += Math.sign( this.speed ) * this.angularAcceleration;
	}

	#updatePosition(): void {
		const { x: dx, y: dy } = polarToCartesian( {
			radius: this.speed,
			theta : this.direction,
		} );
		this.x += dx;
		this.y += dy;
	}

	draw( ctx: CanvasRenderingContext2D ): void {

		ctx.save();
		ctx.translate( this.x, this.y );
		ctx.rotate( this.direction );

		if ( this.#img ) {
			ctx.drawImage(
				this.#img,
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

		if ( window.DEBUG ) {
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

