export default class InteractiveMapController {
  #model;

  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.emitter.on('inputChange', (event) => this.changeInput(event));
  }

  changeInput(event) {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    this.#model.changeInput(name, value);
  }

  changeIndicatorInputs(type, period, magnitude) {
    this.#model.changeIndicators(type, period, magnitude);
  }

  selectCountry(code) {
    this.#model.selectCountry(code);
  }
}
