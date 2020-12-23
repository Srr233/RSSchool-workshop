export default class CovidDashboardAppController {
  #model;

  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.emitter.on('buttonsFullscreenClick', (id) => this.setFullscreenContainer(id));
  }

  setFullscreenContainer(id) {
    this.#model.setFullscreen(id);
  }
}
