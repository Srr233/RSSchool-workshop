import EventEmitter from './event-emitter';

export default class CovidDashboardAppModel {
  #emitter;

  constructor() {
    this.#emitter = new EventEmitter();
  }

  get emitter() {
    return this.#emitter;
  }

  setFullscreen(id) {
    this.#emitter.emit('setFullscreenContainer', id);
  }
}
