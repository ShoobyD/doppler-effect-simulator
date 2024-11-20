interface IPoint {
	x: number;
	y: number;
}

export function lerp( a: number, b: number, t: number ): number {
	return a + ( b - a ) * t;
}

export function clamp( value: number, min: number, max: number ): number {
	return Math.max( min, Math.min( value, max ) );
}

export function distance( a: IPoint, b: IPoint ): number {
	return Math.hypot( a.x - b.x, a.y - b.y );
}

export function changeAbsoluteValue( value: number, diff: number ): number {
	return value + Math.sign( value ) * diff;
}

export function polarToCartesian( radius: number, theta: number ): IPoint {
	return {
		x: radius * Math.cos( theta ),
		y: radius * Math.sin( theta ),
	};
}

