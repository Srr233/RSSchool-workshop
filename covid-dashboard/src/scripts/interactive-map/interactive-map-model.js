import EventEmitter from '../event-emitter';
import { indicators, grades } from './interactive-map-constants';

export default class InteractiveMapModel {
  #type;

  #period;

  #magnitude;

  #grades;

  #data;

  #emitter;

  constructor(data) {
    this.#type = indicators.type.cases;
    this.#period = indicators.period.total;
    this.#magnitude = indicators.magnitude.absolute;
    this.#grades = grades.cases;
    this.#data = data;
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

  get grades() {
    return this.#grades;
  }

  get data() {
    return this.#data;
  }

  get emitter() {
    return this.#emitter;
  }

  changeInput(name, value) {
    if (name === 'type') this.#type = value;
    if (name === 'period') this.#period = value;
    if (name === 'magnitude') this.#magnitude = value;

    this.setGrades();

    this.#emitter.emit('changeMap');
  }

  changeIndicators(type, period, magnitude) {
    this.#type = type;
    this.#period = period;
    this.#magnitude = magnitude;

    this.setGrades();

    this.#emitter.emit('changeIndicatorInputs');
    this.#emitter.emit('changeMap');
  }

  selectCountry(code) {
    this.#emitter.emit('selectCountryOnMap', code);
  }

  setGrades() {
    this.#grades = Array.from(grades[this.#type]).map((grade, index) => {
      const color = grade.color;
      let value = grade.value;

      if (index) {
        value = this.#period === indicators.period.today ? value / 50 : value;
        value = this.#magnitude === indicators.magnitude.per100Thousand ? value / 500 : value;
      }

      return { color: color, value: value };
    });
  }
}
