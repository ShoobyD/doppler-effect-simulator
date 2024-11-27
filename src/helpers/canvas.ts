export function drawDot( ctx: CanvasRenderingContext2D, x: number, y: number ): void {
	const dotSize = 2;
	ctx.fillStyle = 'green';
	ctx.fillRect( x - dotSize / 2, y - dotSize / 2, dotSize, dotSize );
}

