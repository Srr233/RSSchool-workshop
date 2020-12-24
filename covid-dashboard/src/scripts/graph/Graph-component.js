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
    this.canvas7 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas8 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas9 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas10 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas11 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);
    this.canvas12 = createDOMElement('canvas', 'chart-graph', '', '', ['id', 'chart-id']);

    this.NewCases = createDOMElement('div', 'chart new-cases active', this.canvas1, this.graphDiv);
    this.NewDeaths = createDOMElement('div', 'chart new-deaths', this.canvas2, this.graphDiv);
    this.NewRecovered = createDOMElement('div', 'chart new-recovered', this.canvas3, this.graphDiv);
    this.NewCasesPer100K = createDOMElement('div', 'chart new-cases-per100K', this.canvas4, this.graphDiv);
    this.NewDeathsPer100K = createDOMElement('div', 'chart new-deaths-per100K', this.canvas5, this.graphDiv);
    this.NewRecoveredPer100K = createDOMElement('div', 'chart new-recovered-per100K', this.canvas6, this.graphDiv);
    this.Cases = createDOMElement('div', 'chart cases', this.canvas7, this.graphDiv);
    this.Deaths = createDOMElement('div', 'chart deaths', this.canvas8, this.graphDiv);
    this.Recovered = createDOMElement('div', 'chart recovered', this.canvas9, this.graphDiv);
    this.CasesPer100K = createDOMElement('div', 'chart cases-per100K', this.canvas10, this.graphDiv);
    this.DeathsPer100K = createDOMElement('div', 'chart deaths-per100K', this.canvas11, this.graphDiv);
    this.RecoveredPer100K = createDOMElement('div', 'chart recovered-per100K', this.canvas12, this.graphDiv);

    this.navigation = createDOMElement('div', 'graph-navigation', '', this.graphDiv);

    this.container.appendChild(this.graphDiv);

    this.createNavigation();
  }

  createNavigation() {
    const newCases = createDOMElement('div', 'nav-item new-cases-nav active', 'Daily Cases');
    const newDeaths = createDOMElement('div', 'nav-item new-deaths-nav', 'Daily Deaths');
    const newRecovered = createDOMElement('div', 'nav-item new-recovered-nav', 'Daily Recovered');
    const newCasesPer100K = createDOMElement('div', 'nav-item new-cases-per100K-nav', 'Daily Cases per 100k');
    const newDeathsPer100K = createDOMElement('div', 'nav-item new-deaths-per100K-nav', 'Daily Deaths per 100k');
    const newRecoveredPer100K = createDOMElement('div', 'nav-item new-recovered-per100K-nav', 'Daily Recovered per 100k');
    const cases = createDOMElement('div', 'nav-item cases-nav', 'Cumulative cases');
    const deaths = createDOMElement('div', 'nav-item deaths-nav', 'Cumulative Deaths');
    const recovered = createDOMElement('div', 'nav-item recovered-nav', 'Cumulative Recovered');
    const casesPer100K = createDOMElement('div', 'nav-item cases-per100K-nav', 'Cumulative Cases per 100k');
    const deathsPer100K = createDOMElement('div', 'nav-item deaths-per100K-nav', 'Cumulative Deaths per 100k');
    const recoveredPer100K = createDOMElement('div', 'nav-item recovered-per100K-nav', 'Cumulative Recovered per 100k');

    const leftArrowImg = createDOMElement('img', 'arrow left', '', '', ['src', leftArrow]);
    const rightArrowImg = createDOMElement('img', 'arrow right', '', '', ['src', rightArrow]);
    const leftArrowDiv = createDOMElement('div', 'left-arrow', leftArrowImg);
    const rightArrowDiv = createDOMElement('div', 'right-arrow', rightArrowImg);

    this.navigation.append(
      leftArrowDiv,
      newCases,
      newDeaths,
      newRecovered,
      newCasesPer100K,
      newDeathsPer100K,
      newRecoveredPer100K,
      cases,
      deaths,
      recovered,
      casesPer100K,
      deathsPer100K,
      recoveredPer100K,
      rightArrowDiv
    );
  }

  showData(covidData, isGlobal) {
    const data = covidData.reverse();
    const yellow = 'rgb(255, 170, 0)';
    const black = 'rgb(34, 34, 34)';
    const green = 'rgb(28, 145, 17)';
    const magnitude = 'absolute';
    const barType = 'bar';
    const bubbleType = 'line';

    if (isGlobal) {
      const newConfirmedArray = data.map((element) => element.new_confirmed);
      const newDeathsArray = data.map((element) => element.new_deaths);
      const newRecoveredArray = data.map((element) => element.new_recovered);
      const confirmedArray = data.map((element) => element.confirmed);
      const deathsArray = data.map((element) => element.deaths);
      const recoveredArray = data.map((element) => element.recovered);
      const dateArray = data.map((element) => element.date);

      createChart(this.canvas1, newConfirmedArray, dateArray, yellow, magnitude, barType);
      createChart(this.canvas2, newDeathsArray, dateArray, black, magnitude, barType);
      createChart(this.canvas3, newRecoveredArray, dateArray, green, magnitude, barType);
      createChart(this.canvas7, confirmedArray, dateArray, yellow, magnitude, bubbleType);
      createChart(this.canvas8, deathsArray, dateArray, black, magnitude, bubbleType);
      createChart(this.canvas9, recoveredArray, dateArray, green, magnitude, bubbleType);
      return;
    }
    const newConfirmedArray = data.map((element) => element.new_confirmed);
    const newDeathsArray = data.map((element) => element.new_deaths);
    const newRecoveredArray = data.map((element) => element.new_recovered);
    const confirmedArray = data.map((element) => element.confirmed);
    const deathsArray = data.map((element) => element.deaths);
    const recoveredArray = data.map((element) => element.recovered);
    const dateArray = data.map((element) => element.date);

    createChart(this.canvas1, newConfirmedArray, dateArray, yellow, magnitude, barType);
    createChart(this.canvas2, newDeathsArray, dateArray, black, magnitude, barType);
    createChart(this.canvas3, newRecoveredArray, dateArray, green, magnitude, barType);
    createChart(this.canvas7, confirmedArray, dateArray, yellow, magnitude, bubbleType);
    createChart(this.canvas8, deathsArray, dateArray, black, magnitude, bubbleType);
    createChart(this.canvas9, recoveredArray, dateArray, green, magnitude, bubbleType);
  }

  showDataPer100K(covidData, population) {
    const WORLD_POPULATION = 7833601000;
    const purple = 'rgb(150, 45, 170)';
    const blue = 'rgb(20, 1, 99)';
    const red = 'rgb(155, 0, 19)';
    const magnitude = 'per 100K';
    const barType = 'bar';
    const bubbleType = 'line';

    if (population) {
      const newConfirmedArray = covidData.map((element) => element.new_confirmed);
      const newDeathsArray = covidData.map((element) => element.new_deaths);
      const newRecoveredArray = covidData.map((element) => element.new_recovered);
      const confirmedArray = covidData.map((element) => element.confirmed);
      const deathsArray = covidData.map((element) => element.deaths);
      const recoveredArray = covidData.map((element) => element.recovered);
      const dateArray = covidData.map((element) => element.date);

      const newConfirmedPer100KArray = newConfirmedArray.map((el) => el / (population / 100000));
      const newDeathsPer100KArray = newDeathsArray.map((el) => el / (population / 100000));
      const newRecoveredPer100KArray = newRecoveredArray.map((el) => el / (population / 100000));
      const confirmedPer100KArray = confirmedArray.map((el) => el / (population / 100000));
      const deathsPer100KArray = deathsArray.map((el) => el / (population / 100000));
      const recoveredPer100KArray = recoveredArray.map((el) => el / (population / 100000));

      createChart(this.canvas4, newConfirmedPer100KArray, dateArray, purple, magnitude, barType);
      createChart(this.canvas5, newDeathsPer100KArray, dateArray, blue, magnitude, barType);
      createChart(this.canvas6, newRecoveredPer100KArray, dateArray, red, magnitude, barType);
      createChart(this.canvas10, confirmedPer100KArray, dateArray, purple, magnitude, bubbleType);
      createChart(this.canvas11, deathsPer100KArray, dateArray, blue, magnitude, bubbleType);
      createChart(this.canvas12, recoveredPer100KArray, dateArray, red, magnitude, bubbleType);
      return;
    }
    const newConfirmedArray = covidData.map((element) => element.new_confirmed);
    const newDeathsArray = covidData.map((element) => element.new_deaths);
    const newRecoveredArray = covidData.map((element) => element.new_recovered);
    const confirmedArray = covidData.map((element) => element.confirmed);
    const deathsArray = covidData.map((element) => element.deaths);
    const recoveredArray = covidData.map((element) => element.recovered);
    const dateArray = covidData.map((element) => element.date);

    const newConfirmedPer100KArr = newConfirmedArray.map((el) => el / (WORLD_POPULATION / 100000));
    const newDeathsPer100KArr = newDeathsArray.map((el) => el / (WORLD_POPULATION / 100000));
    const newRecoveredPer100KArr = newRecoveredArray.map((el) => el / (WORLD_POPULATION / 100000));
    const confirmedPer100KArray = confirmedArray.map((el) => el / (WORLD_POPULATION / 100000));
    const deathsPer100KArray = deathsArray.map((el) => el / (WORLD_POPULATION / 100000));
    const recoveredPer100KArray = recoveredArray.map((el) => el / (WORLD_POPULATION / 100000));

    createChart(this.canvas4, newConfirmedPer100KArr, dateArray, purple, magnitude, barType);
    createChart(this.canvas5, newDeathsPer100KArr, dateArray, blue, magnitude, barType);
    createChart(this.canvas6, newRecoveredPer100KArr, dateArray, red, magnitude, barType);
    createChart(this.canvas10, confirmedPer100KArray, dateArray, purple, magnitude, bubbleType);
    createChart(this.canvas11, deathsPer100KArray, dateArray, blue, magnitude, bubbleType);
    createChart(this.canvas12, recoveredPer100KArray, dateArray, red, magnitude, bubbleType);
  }
}
