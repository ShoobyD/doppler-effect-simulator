import { createHtmlElement } from './utils/dom.ts';

interface IControlData {
	name: string;
	label: string;
	handler: ( value: number ) => void;
	defaultValue: number;
	min?: number;
	max?: number;
	step?: number;
}

export default class ControlsBar {
	wrapper: HTMLElement;
	controlsData: IControlData[];

	constructor( wrapper: HTMLElement, controlsData: IControlData[] ) {
		this.wrapper      = wrapper;
		this.controlsData = controlsData;

		controlsData.forEach( this.#buildControl.bind( this ) );
	}

	#buildControl( controlData: IControlData ): void {
		const controlElement = createHtmlElement( `
			<label id="${ controlData.name }">
				<div class="label">${ controlData.label } (<output></output>)</div>
				<input type="range" min="${ controlData.min || 1 }" max="${ controlData.max || 10 }" step="${ controlData.step || 1 }">
			</label>
		` );
		this.wrapper.append( controlElement );

		const inputElement  = controlElement.querySelector( 'input' )!;
		const outputElement = controlElement.querySelector( 'output' )!;

		inputElement.addEventListener( 'input', () => {
			outputElement.value = inputElement.value;
			controlData.handler( +inputElement.value );
		} );

		inputElement.value = controlData.defaultValue.toString();
		setTimeout( () => inputElement.dispatchEvent( new Event( 'input' ) ) );
	}
}

