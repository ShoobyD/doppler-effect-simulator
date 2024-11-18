export default class Controller {
	up: boolean    = false;
	down: boolean  = false;
	left: boolean  = false;
	right: boolean = false;

	constructor() {
		this.#addKeyboardListeners();
	}

	#addKeyboardListeners(): void {
		document.addEventListener( 'keydown', event => {
			switch ( event.key ) {
				case 'ArrowUp':
					this.up = true;
					break;
				case 'ArrowDown':
					this.down = true;
					break;
				case 'ArrowLeft':
					this.left = true;
					break;
				case 'ArrowRight':
					this.right = true;
					break;
			}
		} );

		document.addEventListener( 'keyup', event => {
			switch ( event.key ) {
				case 'ArrowUp':
					this.up = false;
					break;
				case 'ArrowDown':
					this.down = false;
					break;
				case 'ArrowLeft':
					this.left = false;
					break;
				case 'ArrowRight':
					this.right = false;
					break;
			}
		} );
	}
}

