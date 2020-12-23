import createDOMElement from './createDOMElement.js';
import createChart from './createChart.js';
import leftArrow from '../../assets/left-arrow.svg';
import rightArrow from '../../assets/right-arrow.svg';

export default class GraphComponent {
  constructor() {
    this.container = document.querySelector('.component-graph');
  }

  initialize() {
    this.graphDiv = createDOMElement('div', 'graph');

    this.canvas1 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas2 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas3 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas4 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas5 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas6 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);

    this.Cases = createDOMElement('div', 'chart cases active', this.canvas1, this.graphDiv);
    this.Deaths = createDOMElement('div', 'chart deaths', this.canvas2, this.graphDiv);
    this.Recovered = createDOMElement('div', 'chart recovered', this.canvas3, this.graphDiv);
    this.CasesPer100K = createDOMElement('div', 'chart cases-per100K', this.canvas4, this.graphDiv);
    this.DeathsPer100K = createDOMElement('div', 'chart deaths-per100K', this.canvas5, this.graphDiv);
    this.RecoveredPer100K = createDOMElement('div', 'chart recovered-per100K', this.canvas6, this.graphDiv);

    this.navigation = createDOMElement('div', 'graph-navigation', '', this.graphDiv);

    this.container.appendChild(this.graphDiv);

    this.createNavigation();
    this.createModalMenu();
  }

  createNavigation() {
    const cases = createDOMElement('div', 'nav-item cases-nav active', 'Daily Cases');
    const deaths = createDOMElement('div', 'nav-item deaths-nav', 'Daily Deaths');
    const recovered = createDOMElement('div', 'nav-item recovered-nav', 'Daily Recovered');
    const casesPer100K = createDOMElement('div', 'nav-item cases-per100K-nav', 'Daily Cases per 100k');
    const deathsPer100K = createDOMElement('div', 'nav-item deaths-per100K-nav', 'Daily Deaths per 100k');
    const recoveredPer100K = createDOMElement('div', 'nav-item recovered-per100K-nav', 'Daily Recovered per 100k');

    const leftArrowImg = createDOMElement('img', 'arrow left', '', '', ['src', leftArrow]);
    const rightArrowImg = createDOMElement('img', 'arrow right', '', '', ['src', rightArrow]);
    const leftArrowDiv = createDOMElement('div', 'left-arrow', leftArrowImg);
    const rightArrowDiv = createDOMElement('div', 'right-arrow', rightArrowImg);

    this.navigation.append(
      leftArrowDiv,
      cases,
      deaths,
      recovered,
      casesPer100K,
      deathsPer100K,
      recoveredPer100K,
      rightArrowDiv
    );
  }

  createModalMenu() {
    const title = createDOMElement('div', 'modal-title', 'Select a Chart');
    const cases = createDOMElement('div', 'modal cases-modal', 'Daily Cases');
    const deaths = createDOMElement('div', 'modal deaths-modal', 'Daily Deaths');
    const recovered = createDOMElement('div', 'modal recovered-modal', 'Daily Recovered');
    const casesPer100K = createDOMElement('div', 'modal cases-per100K-modal', 'Daily Cases per 100k');
    const deathsPer100K = createDOMElement('div', 'modal deaths-per100K-modal', 'Daily Deaths per 100k');
    const recoveredPer100K = createDOMElement('div', 'modal recovered-per100K-modal', 'Daily Recovered per 100k');
    this.modalMenu = createDOMElement('div', 'modal-menu', '', this.navigation);
    this.modalMenu.append(
      title,
      cases,
      deaths,
      recovered,
      casesPer100K,
      deathsPer100K,
      recoveredPer100K
    );
  }

  showData(covidData, isGlobal) {
    let data = covidData;
    const yellow = 'rgb(255, 170, 0)';
    const black = 'rgb(34, 34, 34)';
    const green = 'rgb(28, 145, 17)';
    const magnitude = 'absolute';

    if (isGlobal) {
      data = covidData.reverse();
      const confirmedArray = data.map((element) => element.confirmed);
      const deathsArray = data.map((element) => element.deaths);
      const recoveredArray = data.map((element) => element.recovered);
      const dateArray = data.map((element) => element.date);

      createChart(this.canvas1, confirmedArray, dateArray, yellow, magnitude);
      createChart(this.canvas2, deathsArray, dateArray, black, magnitude);
      createChart(this.canvas3, recoveredArray, dateArray, green, magnitude);
      return;
    }
    const confirmedArray = data.map((element) => element.Confirmed);
    const deathsArray = data.map((element) => element.Deaths);
    const recoveredArray = data.map((element) => element.Recovered);
    const dateArray = data.map((element) => element.Date);

    createChart(this.canvas1, confirmedArray, dateArray, yellow, magnitude);
    createChart(this.canvas2, deathsArray, dateArray, black, magnitude);
    createChart(this.canvas3, recoveredArray, dateArray, green, magnitude);
  }

  showDataPer100K(covidData, population) {
    const WORLD_POPULATION = 7833601000;
    const purple = 'rgb(150, 45, 170)';
    const blue = 'rgb(20, 1, 99)';
    const red = 'rgb(155, 0, 19)';
    const magnitude = 'per 100K';

    if (population) {
      const confirmedArray = covidData.map((element) => element.Confirmed);
      const deathsArray = covidData.map((element) => element.Deaths);
      const recoveredArray = covidData.map((element) => element.Recovered);
      const dateArray = covidData.map((element) => element.Date);

      const confirmedPer100KArray = confirmedArray.map((el) => el / (population / 100000));
      const deathsPer100KArray = deathsArray.map((el) => el / (population / 100000));
      const recoveredPer100KArray = recoveredArray.map((el) => el / (population / 100000));

      createChart(this.canvas4, confirmedPer100KArray, dateArray, purple, magnitude);
      createChart(this.canvas5, deathsPer100KArray, dateArray, blue, magnitude);
      createChart(this.canvas6, recoveredPer100KArray, dateArray, red, magnitude);
      return;
    }

    const confirmedArray = covidData.map((element) => element.confirmed);
    const deathsArray = covidData.map((element) => element.deaths);
    const recoveredArray = covidData.map((element) => element.recovered);
    const dateArray = covidData.map((element) => element.date);

    const confirmedPer100KArray = confirmedArray.map((el) => el / (WORLD_POPULATION / 100000));
    const deathsPer100KArray = deathsArray.map((el) => el / (WORLD_POPULATION / 100000));
    const recoveredPer100KArray = recoveredArray.map((el) => el / (WORLD_POPULATION / 100000));

    createChart(this.canvas4, confirmedPer100KArray, dateArray, purple, magnitude);
    createChart(this.canvas5, deathsPer100KArray, dateArray, blue, magnitude);
    createChart(this.canvas6, recoveredPer100KArray, dateArray, red, magnitude);
  }
}
