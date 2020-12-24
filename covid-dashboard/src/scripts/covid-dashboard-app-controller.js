import { indicators } from './interactive-map/interactive-map-constants';

export default class CovidDashboardAppController {
  #model;

  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.emitter.on('buttonsFullscreenClick', (id) => this.setFullscreenContainer(id));
    this.#view.emitter.on('listNavigationClick', (event) => this.changeIndicatorList(event, 'list'));
    this.#view.emitter.on('interactiveMapSettingClick', (event) => this.changeIndicatorMap(event, 'map'));
    this.#view.emitter.on('tableNavigationClick', (event) => this.changeIndicatorTable(event, 'table'));
    this.#view.emitter.on('graphNavigationClick', (event) => this.changeIndicatorGraph(event, 'graph'));
    this.#view.emitter.on('mapLayerClick', () => this.selectCountryFromMap());
    this.#view.emitter.on('dataCellClick', (code) => this.selectCountryFromList(code));
  }

  setFullscreenContainer(id) {
    this.#model.setFullscreen(id);
  }

  changeIndicatorList(event, component) {
    const indicator = event.currentTarget.childNodes[1].nodeValue;
    let type;
    let period;
    let magnitude;

    if (indicator.includes('Cases')) type = indicators.type.cases;
    if (indicator.includes('Deathes') || indicator.includes('Deaths')) type = indicators.type.deaths;
    if (indicator.includes('Recovered')) type = indicators.type.recovered;

    if (indicator.includes('Total')) {
      period = indicators.period.total;
    } else {
      period = indicators.period.today;
    }

    if (indicator.includes('per 100,000')) {
      magnitude = indicators.magnitude.per100Thousand;
    } else {
      magnitude = indicators.magnitude.absolute;
    }

    this.#model.changeIndicators(type, period, magnitude, component);
  }

  changeIndicatorMap(event, component) {
    const inputs = Array.from(event.currentTarget.querySelectorAll('input'))
      .filter((input) => input.checked);
    const type = inputs.find((input) => input.getAttribute('name') === 'type').getAttribute('value');
    const period = inputs.find((input) => input.getAttribute('name') === 'period').getAttribute('value');
    const magnitude = inputs.find((input) => input.getAttribute('name') === 'magnitude').getAttribute('value');

    this.#model.changeIndicators(type, period, magnitude, component);
  }

  changeIndicatorTable(event, component) {
    const type = event.currentTarget.getAttribute('data-type');
    const period = event.currentTarget.getAttribute('data-period');
    const magnitude = event.currentTarget.getAttribute('data-magnitude');

    this.#model.changeIndicators(type, period, magnitude, component);
  }

  changeIndicatorGraph(event, component) {
    const type = event.currentTarget.getAttribute('data-type');
    const period = event.currentTarget.getAttribute('data-period');
    const magnitude = event.currentTarget.getAttribute('data-magnitude');

    this.#model.changeIndicators(type, period, magnitude, component);
  }

  selectCountryFromMap() {
    const info = document.querySelectorAll('.info')[1];
    const code = info.getAttribute('code');

    info.setAttribute('code', '');

    if (code) this.#model.selectCountry(code);
  }

  selectCountryFromList(code) {
    this.#model.selectCountry(code);
  }
}
