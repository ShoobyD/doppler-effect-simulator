import EventBus from './util-classes/EventBus.ts';

declare global {
	interface Window {
		eventBus: EventBus;
	}

	interface Math {
		TAU: number;
	}
}

Math.TAU ??= 2 * Math.PI;

window.eventBus = new EventBus();

