export default class EventBus {
	#events: Record<string, Function[]> = {};

	on( eventName: string, callback: Function ): this {
		this.#events[ eventName ] ??= [];
		this.#events[ eventName ].push( callback );
		return this;
	}

	off( eventName: string, callback: Function ): this {
		const eventCallbacks      = this.#events[ eventName ];
		this.#events[ eventName ] = callback? eventCallbacks?.filter( eventCallback => eventCallback !== callback ): [];
		return this;
	}

	emit( eventName: string, ...args: any[] ): this {
		this.#events[ eventName ]?.forEach( callback => setTimeout( () => callback( ...args ) ) );
		return this;
	}

	destroy(): this {
		this.#events = {};
		return this;
	}
}

