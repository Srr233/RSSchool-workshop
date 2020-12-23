import EventEmitter from './event-emitter';

export default class CovidDashboardAppView {
  #model;

  #elements;

  #emitter;

  constructor(model, elements) {
    this.#model = model;
    this.#elements = elements;
    this.#emitter = new EventEmitter();

    this.#model.emitter.on('setFullscreenContainer', (id) => this.setFullscreenContainer(id));

    this.#elements.buttonsFullscreen.forEach((button) => button.addEventListener('click', (event) => {
      const id = event.currentTarget.getAttribute('id');
      this.#emitter.emit('buttonsFullscreenClick', id);
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
}
