import EventEmitter from './event-emitter';

export default class CovidDashboardAppView {
  #model;

  #elements;

  #emitter;

  #dataCell;

  constructor(model, elements) {
    this.#model = model;
    this.#elements = elements;
    this.#emitter = new EventEmitter();

    const mapLayer = document.querySelector('#interactive-map');
    this.#dataCell = document.querySelectorAll('.data-cell');

    this.#model.emitter.on('setFullscreenContainer', (id) => this.setFullscreenContainer(id));
    this.#model.emitter.on('changeIndicator', (component) => this.changeIndicatorComponents(component));
    this.#model.emitter.on('selectCountry', (code) => this.selectCountryComponents(code));

    this.#elements.buttonsFullscreen.forEach((button) => button.addEventListener('click', (event) => {
      const id = event.currentTarget.getAttribute('id');
      this.#emitter.emit('buttonsFullscreenClick', id);
    }));
    this.#elements.listNavigation.addEventListener('click', (event) => {
      this.#emitter.emit('listNavigationClick', event);
    });
    this.#elements.interactiveMapSetting.addEventListener('click',
      (event) => this.#emitter.emit('interactiveMapSettingClick', event));
    this.#elements.tableNavigation.addEventListener('click',
      (event) => this.#emitter.emit('tableNavigationClick', event));
    this.#elements.graphNavigation.addEventListener('click',
      (event) => this.#emitter.emit('graphNavigationClick', event));
    mapLayer.addEventListener('click', () => this.#emitter.emit('mapLayerClick'));
    this.#dataCell.forEach((cell) => cell.addEventListener('click', (event) => {
      const id = event.currentTarget.getAttribute('id');
      this.#emitter.emit('dataCellClick', id);
    }));
  }

  get emitter() {
    return this.#emitter;
  }

  setFullscreenContainer(id) {
    const container = this.#elements.componentContainers.find((item) => item.getAttribute('id') === id);
    const dataFullscreen = container.getAttribute('data-fullscreen') ? '' : 'true';

    if (dataFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    container.setAttribute('data-fullscreen', dataFullscreen);
    window.dispatchEvent(new Event('resize'));
  }

  changeIndicatorComponents(component) {
    const type = this.#model.type;
    const period = this.#model.period;
    const magnitude = this.#model.magnitude;

    if (component !== 'list') this.changeIndicatorList(type, period, magnitude);
    if (component !== 'map') this.changeIndicatorMap(type, period, magnitude);
    if (component !== 'table') this.changeIndicatorTable(type, period, magnitude);
    if (component !== 'graph') this.changeIndicatorGraph(type, period, magnitude);

    this.#dataCell = document.querySelectorAll('.data-cell');
    this.#dataCell.forEach((cell) => cell.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('id');
      this.#emitter.emit('dataCellClick', id);
    }));
  }

  changeIndicatorList(type, period, magnitude) {
    this.#elements.list.setIndicators(type, period, magnitude);
    this.#elements.list.startProcessing();
  }

  changeIndicatorMap(type, period, magnitude) {
    this.#elements.map.changeIndicatorInputs(type, period, magnitude);
  }

  changeIndicatorTable(type, period, magnitude) {
    this.#elements.table.setGlobal(type, period, magnitude);
  }

  changeIndicatorGraph(type, period, magnitude) {
    this.#elements.graph.switchChart(type, period, magnitude);
  }

  selectCountryComponents(code) {
    this.#elements.table.setCountry(
      this.#model.type, this.#model.period, this.#model.magnitude, code
    );
    this.#elements.map.selectCountry(code);
    this.#elements.graph.buildCharts(code);
  }
}
