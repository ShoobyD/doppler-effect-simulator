import { drawDot } from '../utils/canvas.ts';
import { lerp }    from '../utils/math.ts';

const roadLength    = 10 ** 5;
const laneMarkWidth = 5;

export default class Road {
	x: number;
	width: number;
	laneCount: number;
	margin: number;

	left: number   = 0;
	right: number  = 0;
	top: number    = -roadLength / 2;
	bottom: number = roadLength / 2;

	constructor( x: number, width: number, laneCount: number, margin: number ) {
		this.x         = x;
		this.width     = width;
		this.laneCount = laneCount;
		this.margin    = margin;

		this.left  = x - width / 2 + margin;
		this.right = x + width / 2 - margin;
	}

	update(): void {
	}

	getLaneCenter( laneIndex: number ): number {
		const laneWidth    = this.width / this.laneCount;
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

