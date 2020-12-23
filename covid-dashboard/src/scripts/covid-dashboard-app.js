import StatisticsTable from './statistics-table-scripts/controller.js';
import InteractiveMap from './interactive-map/interactive-map';
import GraphController from './graph/GraphController.js';
import InitCasesComponent from './cases/init-cases-component';
import Fullscreen from '../assets/fullscreen.svg';
import { urlCovidDataApi, indicators } from './interactive-map/interactive-map-constants';
import { idComponentContainers } from './covid-dashboard-app-constants';
import CovidDashboardAppModel from './covid-dashboard-app-model';
import CovidDashboardAppView from './covid-dashboard-app-view';
import CovidDashboardAppController from './covid-dashboard-app-controller';
import '../assets/rs-school-js.svg';

export default class CovidDashboardApp {
  static async initialize() {
    const overlay = document.querySelector('.load-overlay');
    const response = await fetch(urlCovidDataApi);

    if (response.ok) {
      let data = await response.json();

      CovidDashboardApp.buildCovidDashboardApp(data);
      overlay.setAttribute('style', 'display: none;');
    } else {
      overlay.innerHTML = `<span>Error HTTP: ${response.status}</span>`;
    }
  }

  static buildCovidDashboardApp(data) {
    InteractiveMap.initialize(data);
    const graph = new GraphController();
    graph.initialize();
    const graphNavigation = graph.navigation;
    const statisticsTable = new StatisticsTable(data);
    const casesComponent = new InitCasesComponent(data);

    statisticsTable.init();
    casesComponent.startWork(
      indicators.type.cases,
      indicators.period.total,
      indicators.magnitude.absolute
    );

    CovidDashboardApp.createFooter();

    const elements = CovidDashboardApp.createButtonFullscreen();
    const model = new CovidDashboardAppModel();
    const view = new CovidDashboardAppView(model, {
      map: InteractiveMap.map,
      buttonsFullscreen: elements.buttons,
      componentContainers: elements.componentContainers
    });
    // eslint-disable-next-line no-unused-vars
    const controller = new CovidDashboardAppController(model, view);
  }

  static createButtonFullscreen() {
    const componentContainers = Array.from(document.querySelectorAll('.component-container'));
    const imgFullscreen = document.createElement('img');

    imgFullscreen.setAttribute('src', Fullscreen);
    imgFullscreen.setAttribute('alt', 'fullscreen');

    const buttons = idComponentContainers.map((id) => {
      const button = document.createElement('button');

      button.setAttribute('id', id);
      button.setAttribute('class', 'button-fullscreen');
      button.appendChild(imgFullscreen.cloneNode());

      return button;
    });

    componentContainers.forEach((item, index) => {
      item.appendChild(buttons[index]);
      item.setAttribute('id', idComponentContainers[index]);
      item.setAttribute('data-fullscreen', '');
    });

    return {
      buttons: buttons,
      componentContainers: componentContainers
    };
  }

  static createFooter() {
    const footer = document.querySelector('.footer');

    footer.innerHTML = `<div class="author">
      <a href="https://github.com/DmitryAstapenko">DzmitryAstapenka</a>
      <a href="https://github.com/Srr233">Srr233</a>
      <a href="https://github.com/SlavaJSFE">SlavaJSFE</a>
      <a href="https://github.com/TaniaTat">TaniaTat</a>
    </div>      
    <div class="year">
      <span>2020</span>
    </div>
    <div class="rs-school-js">
      <a href="https://rs.school/js/">
        <img src="./assets/rs-school-js.svg" alt="rs school js">
      </a>
    </div>`;
  }
}
