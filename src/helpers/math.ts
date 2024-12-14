interface IPoint {
	x: number;
	y: number;
}

interface IPolarPoint {
	radius: number;
	theta: number;
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

export function norm( p: IPoint ): number {
	return distance( p, { x: 0, y: 0 } );
}

export function scale( p: IPoint, factor: number ): IPoint {
	return {
		x: p.x * factor,
		y: p.y * factor,
	};
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

export function cartesianToPolar( p: IPoint ): IPolarPoint {
	return {
		radius: norm( p ),
		theta : Math.atan2( p.y, p.x ),
	};
}

export function doppler( srcFrequency: number, srcSpeed: number, soundSpeed: number ): number {
	return srcFrequency * soundSpeed / ( soundSpeed - srcSpeed );
}

