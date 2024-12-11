export function createHtmlElement( htmlString: string = '' ): HTMLElement {
	const templateElement     = document.createElement( 'template' );
	templateElement.innerHTML = htmlString.trim(); // Never return a text node of whitespace as the result
	return templateElement.content.firstChild as HTMLElement;
}

export function asyncLoadImage( imageSrc: string ): Promise<HTMLImageElement> {
	return new Promise( ( resolve, reject ) => {
		const image = new Image();
		image.addEventListener( 'load', () => resolve( image ) );
		image.addEventListener( 'error', () => reject( null ) );
		image.src = imageSrc;
	} );
}

