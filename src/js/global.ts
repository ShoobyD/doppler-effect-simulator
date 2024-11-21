import EventBus from './EventBus.ts';

Math.TAU ??= 2 * Math.PI;

declare global {
	interface Window {
		eventBus: EventBus;
	}
}

window.eventBus = new EventBus();


