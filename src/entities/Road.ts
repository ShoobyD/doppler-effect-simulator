import { drawDot } from '../helpers/canvas.ts';
import { lerp }    from '../helpers/math.ts';

const laneMarkWidth = 5;

export default class Road {
	laneCount: number;
	laneWidth: number;
	length: number;
	margin: number;

	width: number  = 0;
	left: number   = 0;
	right: number  = 0;
	top: number    = 0;
	bottom: number = 0;

	constructor( laneCount: number, laneWidth: number, length: number, margin: number ) {
		this.laneCount = laneCount;
		this.laneWidth = laneWidth;
		this.length    = length;
		this.margin    = margin;
		this.updateSize();
	}

	update(): void {
	}

	setLaneCount( laneCount: number ): void {
		this.laneCount = laneCount;
		this.updateSize();
	}

	updateSize(): void {
		this.width  = this.laneCount * this.laneWidth + 2 * this.margin;
		this.left   = this.margin;
		this.right  = this.width - this.margin;
		this.top    = -this.length / 2;
		this.bottom = this.length / 2;
	}

	getLaneCenter( laneIndex: number ): number {
		const laneWidth    = ( this.width - 2 * this.margin ) / this.laneCount;
		const markPosition = lerp( this.left, this.right, laneIndex / this.laneCount );
		return markPosition + laneWidth / 2;
	}

	draw( ctx: CanvasRenderingContext2D ): void {
		ctx.save();

		ctx.lineWidth   = laneMarkWidth;
		ctx.strokeStyle = 'White';

		for ( let i = 0; i <= this.laneCount; i++ ) {
			const isBorder = [ 0, this.laneCount ].includes( i );
			ctx.setLineDash( isBorder? []: [ 30, 60 ] );

			const markPosition = lerp( this.left, this.right, i / this.laneCount );
			ctx.beginPath();
			ctx.moveTo( markPosition, this.top );
			ctx.lineTo( markPosition, this.bottom );
			ctx.stroke();

			drawDot( ctx, markPosition, 0 );
		}

		ctx.restore();
	}
}

