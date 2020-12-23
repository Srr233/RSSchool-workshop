export default class EventEmitter {
    #events;

    constructor() {
      this.#events = {};
    }

    on(event, listener) {
      (this.#events[event] || (this.#events[event] = [])).push(listener);
      return this;
    }

    emit(event, argument) {
      (this.#events[event] || []).slice().forEach(
        listener => listener(argument)
      );
    }
}
