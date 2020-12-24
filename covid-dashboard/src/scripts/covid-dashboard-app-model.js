import EventEmitter from './event-emitter';
import { indicators } from './interactive-map/interactive-map-constants';

export default class CovidDashboardAppModel {
  #type;

  #period;

  #magnitude;

  #emitter;

  constructor() {
    this.#type = indicators.type.cases;
    this.#period = indicators.period.total;
    this.#magnitude = indicators.magnitude.absolute;
    this.#emitter = new EventEmitter();
  }

  get type() {
    return this.#type;
  }

  get period() {
    return this.#period;
  }

  get magnitude() {
    return this.#magnitude;
  }

  get emitter() {
    return this.#emitter;
  }

  setFullscreen(id) {
    this.#emitter.emit('setFullscreenContainer', id);
  }

  changeIndicators(type, period, magnitude, component) {
    this.#type = type;
    this.#period = period;
    this.#magnitude = magnitude;

    this.#emitter.emit('changeIndicator', component);
  }

  selectCountry(code) {
    this.#emitter.emit('selectCountry', code);
  }
}
