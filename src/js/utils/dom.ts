export function createHtmlElement( htmlString: string = '' ): HTMLElement {
	const templateElement     = document.createElement( 'template' );
	templateElement.innerHTML = htmlString.trim(); // Never return a text node of whitespace as the result
	return templateElement.content.firstChild as HTMLElement;
}

