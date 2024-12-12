import EventBus from './util-classes/EventBus.ts';

declare global {
	interface Window {
		DEBUG: boolean;
		isTouchDevice: boolean;
		eventBus: EventBus;
	}

	interface Math {
		TAU: number;
	}
}

Math.TAU ??= 2 * Math.PI;

window.isTouchDevice = ( 'ontouchstart' in window );

window.eventBus = new EventBus();

