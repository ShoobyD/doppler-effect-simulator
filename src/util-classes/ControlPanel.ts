import { createHtmlElement } from '../helpers/dom.ts';

interface IControlData {
	name: string;
	label: string;
	defaultValue: number;
	minValue?: number;
	maxValue?: number;
	step?: number;
	handler: ( value: number ) => void;
}

export default class ControlPanel {
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
				<input type="range" min="${ controlData.minValue || 1 }" max="${ controlData.maxValue || 10 }" step="${ controlData.step || 1 }">
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

