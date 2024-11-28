export function expose( objects: Record<string, any> ): void {
	Object.assign( window, objects );
	console.log( objects );
}

